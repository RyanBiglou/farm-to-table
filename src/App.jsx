import { Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import Header from './components/Header'
import Footer from './components/Footer'
import ZipCodeModal from './components/ZipCodeModal'
import Home from './pages/Home'
import Farms from './pages/Farms'
import FarmDetail from './pages/FarmDetail'
import Products from './pages/Products'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Account from './pages/Account'
import PrivacyPolicy from './pages/PrivacyPolicy'
import Terms from './pages/Terms'
import CheckoutSuccess from './pages/CheckoutSuccess'
import './styles/App.css'

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="app">
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
              <Route path="/account" element={<Account />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<Terms />} />
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

