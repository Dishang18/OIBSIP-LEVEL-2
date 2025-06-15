import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { login, googleLogin } from '../../services/authService';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setCurrentUser } = useAuth();
  
  // Get email from URL if coming from registration page
  const searchParams = new URLSearchParams(location.search);
  const emailFromURL = searchParams.get('email') || '';
  
  const [formData, setFormData] = useState({
    email: emailFromURL,
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { email, password } = formData;
  
  // Redirect to home if user is already logged in
  useEffect(() => {
    // You can add redirect logic here if needed
  }, []);
  
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user types
    if (error) setError('');
  };
  
  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    
    setLoading(true);
    
    try {
      const result = await login(email, password);
      
      if (result.success) {
        setCurrentUser(result.user);
        toast.success('Welcome back!');
        
        // Redirect to intended page or home
        const redirectTo = location.state?.from?.pathname || '/';
        navigate(redirectTo);
      } else {
        setError(result.message);
        if (result.error === 'auth/user-not-found') {
          toast.info(
            <div>
              No account found. <Link to="/register">Create an account</Link>
            </div>,
            { autoClose: 5000 }
          );
        }
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    
    try {
      const result = await googleLogin();
      
      if (result.success) {
        setCurrentUser(result.user);
        toast.success('Successfully signed in with Google!');
        
        // Redirect to intended page or home
        const redirectTo = location.state?.from?.pathname || '/';
        navigate(redirectTo);
      } else {
        setError(result.message);
      }
    } catch (err) {
      console.error('Google login error:', err);
      setError('Failed to sign in with Google. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Sign In</h1>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={onChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="your@email.com"
          />
        </div>
        
        <div>
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={onChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="********"
          />
        </div>
        
        <div className="flex items-center justify-between">
          <Link to="/forgot-password" className="text-sm text-red-600 hover:text-red-800">
            Forgot Password?
          </Link>
        </div>
        
        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors disabled:bg-red-300 disabled:cursor-not-allowed"
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
      
      <div className="my-4 flex items-center justify-between">
        <hr className="w-full" />
        <span className="px-2 text-gray-500 bg-white">or</span>
        <hr className="w-full" />
      </div>

      <button 
        onClick={handleGoogleLogin} 
        disabled={loading} 
        className="w-full flex items-center justify-center bg-white border border-gray-300 rounded-md py-2 px-4 text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FcGoogle className="text-xl mr-2" />
        Sign in with Google
      </button>
      
      <div className="mt-6 text-center">
        <p className="text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-red-600 hover:text-red-800 font-medium">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;