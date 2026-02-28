import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

  // Race a promise against a timeout (prevents any Supabase call from hanging forever)
  function withTimeout(promise, ms) {
    return Promise.race([
      promise,
      new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), ms)),
    ]);
  }

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initSession = async () => {
      if (!supabase) {
        setLoading(false);
        return;
      }

      try {
        const { data: { session } } = await supabase.auth.getSession();

        if (session) {
          // Validate with a network call, but don't let it hang the whole app
          try {
            const { data: { user: validUser }, error: userError } =
              await withTimeout(supabase.auth.getUser(), 5000);

            if (userError || !validUser) {
              console.warn('Stale session detected, signing out locally');
              await supabase.auth.signOut({ scope: 'local' });
              setUser(null);
              setProfile(null);
              setLoading(false);
              return;
            }

            setUser(validUser);
            await withTimeout(fetchProfile(validUser.id), 5000).catch(() => {});
          } catch {
            // getUser timed out — use the local session so pages aren't stuck
            console.warn('Session validation timed out, using local session');
            setUser(session.user);
          }
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error('Session init error:', err);
        try { await supabase.auth.signOut({ scope: 'local' }); } catch (_) {}
        setUser(null);
        setProfile(null);
      }

      setLoading(false);
    };

    initSession();

    // Listen for auth changes (token refresh, sign in/out, etc.)
    if (supabase) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          if (event === 'SIGNED_OUT') {
            setUser(null);
            setProfile(null);
          } else {
            setUser(session?.user ?? null);
            if (session?.user) {
              fetchProfile(session.user.id).catch(() => {});
            } else {
              setProfile(null);
            }
          }
        }
      );

      return () => subscription.unsubscribe();
    }
  }, []);

  const fetchProfile = async (userId) => {
    if (!supabase) return;

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching profile:', error);
    }
    
    setProfile(data || null);
  };

  const signUp = async (email, password, metadata = {}) => {
    if (!supabase) {
      return { error: { message: 'Supabase not configured' } };
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
        emailRedirectTo: `${window.location.origin}/auth/callback`
      }
    });

    // When confirm email is enabled, Supabase returns success for existing emails
    // but identities is empty — treat as duplicate
    if (!error && data.user && (!data.user.identities || data.user.identities.length === 0)) {
      return { data: null, error: { message: 'An account with this email already exists. Please sign in.' } };
    }

    if (!error && data.user) {
      // Create profile
      await supabase.from('profiles').upsert({
        id: data.user.id,
        email: data.user.email,
        full_name: metadata.full_name || '',
        phone: metadata.phone || '',
        created_at: new Date().toISOString()
      });
    }

    return { data, error };
  };

  const signInWithGoogle = async () => {
    if (!supabase) {
      return { error: { message: 'Supabase not configured' } };
    }

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    });

    return { error };
  };

  const signIn = async (email, password) => {
    if (!supabase) {
      return { error: { message: 'Supabase not configured' } };
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    return { data, error };
  };

  const signOut = async () => {
    if (!supabase) return;

    // Always clear local state, even if the server call fails (e.g. expired token)
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.warn('Sign-out API failed, clearing locally:', err);
      try { await supabase.auth.signOut({ scope: 'local' }); } catch (_) {}
    }
    setUser(null);
    setProfile(null);
    return { error: null };
  };

  const resendVerificationEmail = async (email) => {
    if (!supabase) {
      return { error: { message: 'Supabase not configured' } };
    }

    const { error } = await supabase.auth.resend({
      type: 'signup',
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`
      }
    });

    return { error };
  };

  const resetPassword = async (email) => {
    if (!supabase) {
      return { error: { message: 'Supabase not configured' } };
    }

    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/account/reset-password`
    });

    return { data, error };
  };

  const updateProfile = async (updates) => {
    if (!supabase || !user) {
      return { error: { message: 'Not authenticated' } };
    }

    const { data, error } = await supabase
      .from('profiles')
      .upsert({
        id: user.id,
        ...updates,
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (!error) {
      setProfile(data);
    }

    return { data, error };
  };

  const updateEmail = async (newEmail) => {
    if (!supabase) {
      return { error: { message: 'Supabase not configured' } };
    }

    const { data, error } = await supabase.auth.updateUser({
      email: newEmail
    });

    return { data, error };
  };

  const updatePassword = async (newPassword) => {
    if (!supabase) {
      return { error: { message: 'Supabase not configured' } };
    }

    const { data, error } = await supabase.auth.updateUser({
      password: newPassword
    });

    return { data, error };
  };

  const value = {
    user,
    profile,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    resendVerificationEmail,
    resetPassword,
    updateProfile,
    updateEmail,
    updatePassword,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
