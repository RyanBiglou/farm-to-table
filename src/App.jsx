import { Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Farms from './pages/Farms'
import FarmDetail from './pages/FarmDetail'
import Products from './pages/Products'
import Cart from './pages/Cart'
import PrivacyPolicy from './pages/PrivacyPolicy'
import Terms from './pages/Terms'
import CheckoutSuccess from './pages/CheckoutSuccess'
import './styles/App.css'

function App() {
  return (
    <CartProvider>
      <div className="app">
        <Header />
        <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/farms" element={<Farms />} />
            <Route path="/farms/:id" element={<FarmDetail />} />
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/checkout-success" element={<CheckoutSuccess />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </CartProvider>
  )
}

export default App

