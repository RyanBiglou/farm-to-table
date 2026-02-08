import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  User, Mail, Phone, MapPin, Package, Heart, Settings, 
  LogOut, Edit2, Save, X, AlertCircle, Check, ChevronRight,
  ShoppingBag, Clock
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Account.css';

export default function Account() {
  const navigate = useNavigate();
  const { user, profile, signOut, updateProfile, loading } = useAuth();
  
  const [activeTab, setActiveTab] = useState('profile');
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || '',
    phone: profile?.phone || '',
    address: profile?.address || '',
    city: profile?.city || '',
    state: profile?.state || '',
    zip_code: profile?.zip_code || ''
  });

  // Redirect if not logged in
  if (!loading && !user) {
    navigate('/login', { state: { from: { pathname: '/account' } } });
    return null;
  }

  if (loading) {
    return (
      <div className="account-page">
        <div className="container">
          <div className="loading-state">Loading...</div>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage({ type: '', text: '' });

    const { error } = await updateProfile(formData);

    if (error) {
      setMessage({ type: 'error', text: error.message });
    } else {
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      setEditing(false);
    }
    setSaving(false);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'favorites', label: 'Favorites', icon: Heart },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="account-page">
      <div className="container">
        <motion.div
          className="account-layout"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Sidebar */}
          <aside className="account-sidebar">
            <div className="account-user">
              <div className="user-avatar">
                {profile?.full_name ? profile.full_name.charAt(0).toUpperCase() : user?.email?.charAt(0).toUpperCase()}
              </div>
              <div className="user-info">
                <h3>{profile?.full_name || 'Welcome!'}</h3>
                <p>{user?.email}</p>
              </div>
            </div>

            <nav className="account-nav">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <tab.icon size={20} />
                  {tab.label}
                  <ChevronRight size={16} className="nav-arrow" />
                </button>
              ))}
            </nav>

            <button className="sign-out-btn" onClick={handleSignOut}>
              <LogOut size={20} />
              Sign Out
            </button>
          </aside>

          {/* Main Content */}
          <main className="account-content">
            {activeTab === 'profile' && (
              <section className="account-section">
                <div className="section-header">
                  <h2>Profile Information</h2>
                  {!editing ? (
                    <button className="edit-btn" onClick={() => setEditing(true)}>
                      <Edit2 size={18} />
                      Edit
                    </button>
                  ) : (
                    <div className="edit-actions">
                      <button className="cancel-btn" onClick={() => setEditing(false)}>
                        <X size={18} />
                        Cancel
                      </button>
                      <button className="save-btn" onClick={handleSave} disabled={saving}>
                        <Save size={18} />
                        {saving ? 'Saving...' : 'Save'}
                      </button>
                    </div>
                  )}
                </div>

                {message.text && (
                  <motion.div 
                    className={`account-message ${message.type}`}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {message.type === 'success' ? <Check size={18} /> : <AlertCircle size={18} />}
                    {message.text}
                  </motion.div>
                )}

                <div className="profile-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>
                        <User size={16} />
                        Full Name
                      </label>
                      {editing ? (
                        <input
                          type="text"
                          name="full_name"
                          value={formData.full_name}
                          onChange={handleChange}
                          placeholder="Your full name"
                        />
                      ) : (
                        <p className="form-value">{profile?.full_name || 'Not set'}</p>
                      )}
                    </div>

                    <div className="form-group">
                      <label>
                        <Mail size={16} />
                        Email
                      </label>
                      <p className="form-value">{user?.email}</p>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>
                        <Phone size={16} />
                        Phone Number
                      </label>
                      {editing ? (
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="(555) 123-4567"
                        />
                      ) : (
                        <p className="form-value">{profile?.phone || 'Not set'}</p>
                      )}
                    </div>
                  </div>

                  <h3 className="form-section-title">
                    <MapPin size={18} />
                    Delivery Address
                  </h3>

                  <div className="form-group full-width">
                    <label>Street Address</label>
                    {editing ? (
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="123 Main Street, Apt 4"
                      />
                    ) : (
                      <p className="form-value">{profile?.address || 'Not set'}</p>
                    )}
                  </div>

                  <div className="form-row three-col">
                    <div className="form-group">
                      <label>City</label>
                      {editing ? (
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          placeholder="New York"
                        />
                      ) : (
                        <p className="form-value">{profile?.city || 'Not set'}</p>
                      )}
                    </div>

                    <div className="form-group">
                      <label>State</label>
                      {editing ? (
                        <input
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          placeholder="NY"
                        />
                      ) : (
                        <p className="form-value">{profile?.state || 'Not set'}</p>
                      )}
                    </div>

                    <div className="form-group">
                      <label>ZIP Code</label>
                      {editing ? (
                        <input
                          type="text"
                          name="zip_code"
                          value={formData.zip_code}
                          onChange={handleChange}
                          placeholder="10001"
                        />
                      ) : (
                        <p className="form-value">{profile?.zip_code || 'Not set'}</p>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            )}

            {activeTab === 'orders' && (
              <section className="account-section">
                <div className="section-header">
                  <h2>Order History</h2>
                </div>
                
                <div className="empty-state">
                  <div className="empty-icon">
                    <ShoppingBag size={48} />
                  </div>
                  <h3>No orders yet</h3>
                  <p>When you place orders, they'll appear here.</p>
                  <Link to="/products" className="btn btn-primary">
                    Start Shopping
                  </Link>
                </div>
              </section>
            )}

            {activeTab === 'favorites' && (
              <section className="account-section">
                <div className="section-header">
                  <h2>Favorite Products</h2>
                </div>
                
                <div className="empty-state">
                  <div className="empty-icon">
                    <Heart size={48} />
                  </div>
                  <h3>No favorites yet</h3>
                  <p>Save your favorite products for quick access.</p>
                  <Link to="/products" className="btn btn-primary">
                    Browse Products
                  </Link>
                </div>
              </section>
            )}

            {activeTab === 'settings' && (
              <section className="account-section">
                <div className="section-header">
                  <h2>Account Settings</h2>
                </div>

                <div className="settings-list">
                  <div className="settings-item">
                    <div className="settings-info">
                      <h4>Email Notifications</h4>
                      <p>Receive updates about your orders and new products</p>
                    </div>
                    <label className="toggle">
                      <input type="checkbox" defaultChecked />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>

                  <div className="settings-item">
                    <div className="settings-info">
                      <h4>SMS Notifications</h4>
                      <p>Get text updates about delivery status</p>
                    </div>
                    <label className="toggle">
                      <input type="checkbox" />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>

                  <div className="settings-item">
                    <div className="settings-info">
                      <h4>Weekly Newsletter</h4>
                      <p>Fresh picks, recipes, and farm updates</p>
                    </div>
                    <label className="toggle">
                      <input type="checkbox" defaultChecked />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>

                <div className="danger-zone">
                  <h3>Danger Zone</h3>
                  <div className="danger-item">
                    <div className="danger-info">
                      <h4>Delete Account</h4>
                      <p>Permanently delete your account and all data</p>
                    </div>
                    <button className="btn-danger">Delete Account</button>
                  </div>
                </div>
              </section>
            )}
          </main>
        </motion.div>
      </div>
    </div>
  );
}
