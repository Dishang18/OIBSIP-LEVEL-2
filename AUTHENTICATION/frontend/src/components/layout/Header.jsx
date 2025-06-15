import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaShoppingCart, FaUser, FaSignOutAlt, FaClipboardList } from 'react-icons/fa';

const Header = () => {
  const { user, logout } = useAuth() || { user: null, logout: () => {} };
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Get first name only for greeting
  const firstName = user?.name ? user.name.split(' ')[0] : '';

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <Link to="/" className="text-red-600 font-bold text-2xl">
              Pizza Delights
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-red-600 px-3 py-2 font-medium">
              Home
            </Link>
            <Link to="/menu" className="text-gray-700 hover:text-red-600 px-3 py-2 font-medium">
              Menu
            </Link>
            {user && (
              <>
                <Link to="/cart" className="text-gray-700 hover:text-red-600 px-3 py-2 font-medium">
                  Cart
                </Link>
                <Link to="/orders" className="text-gray-700 hover:text-red-600 px-3 py-2 font-medium">
                  My Orders
                </Link>
              </>
            )}
          </nav>
          
          {/* Authentication Buttons */}
          <div className="hidden md:flex items-center">
            {user ? (
              <div className="relative group">
                <button className="flex items-center text-gray-700 hover:text-red-600 font-medium">
                  {user.profileImage ? (
                    <img 
                      src={user.profileImage} 
                      alt={user.name}
                      className="w-8 h-8 rounded-full mr-2 object-cover border-2 border-red-600"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center mr-2">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="mr-2">Hi, {firstName}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-150 ease-in-out">
                  <Link to="/profile" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-600">
                    <FaUser className="mr-2" /> My Profile
                  </Link>
                  <Link to="/orders" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-600">
                    <FaClipboardList className="mr-2" /> My Orders
                  </Link>
                  <button 
                    onClick={handleLogout} 
                    className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-600"
                  >
                    <FaSignOutAlt className="mr-2" /> Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex space-x-4">
                <Link to="/login" className="px-4 py-2 text-red-600 border border-red-600 rounded-md hover:bg-red-50">
                  Login
                </Link>
                <Link to="/register" className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            {user && (
              <Link to="/cart" className="text-gray-700 hover:text-red-600 mr-4">
                <FaShoppingCart className="h-6 w-6" />
              </Link>
            )}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="text-gray-700 hover:text-red-600"
            >
              {isMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {user && (
              <div className="flex items-center px-3 py-2 border-b border-gray-200 mb-2">
                {user.profileImage ? (
                  <img 
                    src={user.profileImage} 
                    alt={user.name}
                    className="w-10 h-10 rounded-full mr-3 object-cover border-2 border-red-600"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center mr-3">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <p className="font-medium text-gray-800">Hi, {firstName}!</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
            )}
            <Link to="/" className="block px-3 py-2 text-gray-700 hover:text-red-600 font-medium">
              Home
            </Link>
            <Link to="/menu" className="block px-3 py-2 text-gray-700 hover:text-red-600 font-medium">
              Menu
            </Link>
            {user && (
              <>
                <Link to="/cart" className="block px-3 py-2 text-gray-700 hover:text-red-600 font-medium">
                  Cart
                </Link>
                <Link to="/orders" className="block px-3 py-2 text-gray-700 hover:text-red-600 font-medium">
                  My Orders
                </Link>
                <Link to="/profile" className="block px-3 py-2 text-gray-700 hover:text-red-600 font-medium">
                  My Profile
                </Link>
                <button 
                  onClick={handleLogout} 
                  className="w-full text-left px-3 py-2 text-gray-700 hover:text-red-600 font-medium"
                >
                  Logout
                </button>
              </>
            )}
            {!user && (
              <div className="flex flex-col space-y-2 px-3 py-2">
                <Link to="/login" className="px-4 py-2 text-red-600 border border-red-600 rounded-md hover:bg-red-50 text-center">
                  Login
                </Link>
                <Link to="/register" className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-center">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;