import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Layout Components
import Header from './components/layout/Header'
import Footer from './components/layout/Footer';

// Auth Components
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';

// Main App Components
import Home from './components/Home';
// import Menu from './components/menu/Menu';
// import Cart from './components/cart/Cart';
// import Checkout from './components/order/Checkout';
// import OrderHistory from './components/order/OrderHistory';
import Profile from './components/profile/Profile'; // Updated import path
// import NotFound from './components/NotFound';

// Context Providers
import { AuthProvider } from './context/AuthContext';
// import { CartProvider } from './context/CartContext';

// Services
import { getCurrentUser } from './services/authService';

// Simple NotFound component for now
const NotFound = () => <div>Page not found</div>;

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const user = getCurrentUser();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

const App = () => {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Any app initialization logic here
    setLoading(false);
  }, []);
  
  if (loading) {
    return <div className="loader">Loading...</div>;
  }
  
  return (
    <Router>
      <AuthProvider>
        <div className="app-container">
          <Header />
          <main className="main-content">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password/:token" element={<ResetPassword />} />
              
              {/* Profile route */}
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } 
              />
              
              {/* Other routes commented out until implemented */}
              {/* 
              <Route path="/menu" element={<Menu />} />
              <Route 
                path="/cart" 
                element={
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/checkout" 
                element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/orders" 
                element={
                  <ProtectedRoute>
                    <OrderHistory />
                  </ProtectedRoute>
                } 
              />
              */}
              
              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
        <ToastContainer position="bottom-right" />
      </AuthProvider>
    </Router>
  );
};

export default App;