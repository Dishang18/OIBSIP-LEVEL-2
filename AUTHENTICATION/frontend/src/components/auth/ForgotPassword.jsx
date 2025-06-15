import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Here you would typically call an API endpoint to send a reset email
      // For now, we'll just simulate a successful response
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsEmailSent(true);
      toast.success('Reset link sent to your email');
    } catch (error) {
      toast.error('Failed to send reset email');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isEmailSent) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Email Sent</h2>
        <p className="text-gray-600 mb-4 text-center">
          We've sent a password reset link to <strong>{email}</strong>. 
          Please check your inbox and follow the instructions.
        </p>
        <p className="text-gray-500 text-sm text-center mb-4">
          If you don't see the email, please check your spam folder.
        </p>
        <div className="text-center">
          <Link to="/login" className="text-red-600 hover:text-red-800">
            Return to login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Forgot Password</h2>
      <p className="text-gray-600 mb-6 text-center">
        Enter your email address and we'll send you a link to reset your password.
      </p>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Send Reset Link'}
        </button>
      </form>
      
      <div className="mt-4 text-center">
        <Link to="/login" className="text-red-600 hover:text-red-800">
          Back to Login
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;