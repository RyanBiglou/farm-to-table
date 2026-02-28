import { Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import ZipCodeModal from './components/ZipCodeModal'
import Home from './pages/Home'
import Farms from './pages/Farms'
import FarmDetail from './pages/FarmDetail'
import Products from './pages/Products'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Signup from './pages/Signup'
import AuthCallback from './pages/AuthCallback'
import Account from './pages/Account'
import HowItWorks from './pages/HowItWorks'
import FarmPartner from './pages/FarmPartner'
import PrivacyPolicy from './pages/PrivacyPolicy'
import Terms from './pages/Terms'
import Checkout from './pages/Checkout'
import CheckoutSuccess from './pages/CheckoutSuccess'
import './styles/App.css'

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="app">
          <ScrollToTop />
          <ZipCodeModal />
          <Header />
          <main className="main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/farms" element={<Farms />} />
              <Route path="/farms/:id" element={<FarmDetail />} />
              <Route path="/products" element={<Products />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/auth/callback" element={<AuthCallback />} />
              <Route path="/account" element={<Account />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/partner" element={<FarmPartner />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/checkout-success" element={<CheckoutSuccess />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </CartProvider>
    </AuthProvider>
  )
}

export default App

