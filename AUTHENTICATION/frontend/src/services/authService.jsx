import axios from 'axios';
import { auth } from '../config/firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail
} from 'firebase/auth';

// Base URL for your backend API
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper to set auth token in request headers
const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

// Map Firebase error codes to user-friendly messages
const getErrorMessage = (errorCode) => {
  switch (errorCode) {
    case 'auth/email-already-in-use':
      return 'This email is already registered. Please try logging in instead.';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters long.';
    case 'auth/invalid-email':
      return 'Please provide a valid email address.';
    case 'auth/user-not-found':
      return 'No account found with this email. Please register first.';
    case 'auth/wrong-password':
      return 'Incorrect password. Please try again or reset your password.';
    case 'auth/too-many-requests':
      return 'Too many unsuccessful login attempts. Please try again later or reset your password.';
    case 'auth/network-request-failed':
      return 'Network error. Please check your internet connection.';
    default:
      return 'An error occurred. Please try again.';
  }
};

// Register user with email/password (two-step process)
export const register = async (userData) => {
  try {
    // Step 1: Create Firebase auth account
    const userCredential = await createUserWithEmailAndPassword(
      auth, 
      userData.email, 
      userData.password
    );
    
    // Get the Firebase ID token
    const token = await userCredential.user.getIdToken();
    
    // Step 2: Send user data to your backend API with the token
    const response = await axios.post(`${API_URL}/auth/register`, {
      uid: userCredential.user.uid,
      name: userData.name,
      email: userData.email,
      phoneNumber: userData.phoneNumber
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    // Store user data in localStorage for app state
    const user = {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      name: userData.name,
      phoneNumber: userData.phoneNumber,
      token
    };
    
    localStorage.setItem('user', JSON.stringify(user));
    setAuthToken(token);
    
    return { success: true, user };
  } catch (error) {
    console.error('Registration error:', error);
    
    // Return a structured error response
    return { 
      success: false, 
      error: error.code || 'unknown_error',
      message: getErrorMessage(error.code),
      isEmailInUse: error.code === 'auth/email-already-in-use'
    };
  }
};

// Google OAuth sign-in
export const googleLogin = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    
    // Get the Google user info
    const token = await result.user.getIdToken();
    
    // Send the token to your backend to create/update user
    const response = await axios.post(`${API_URL}/auth/google-login`, {
      uid: result.user.uid,
      email: result.user.email,
      name: result.user.displayName,
      photoURL: result.user.photoURL
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    // Store user data
    const user = {
      uid: result.user.uid,
      email: result.user.email,
      name: result.user.displayName,
      photoURL: result.user.photoURL,
      token
    };
    
    localStorage.setItem('user', JSON.stringify(user));
    setAuthToken(token);
    
    return { success: true, user };
  } catch (error) {
    console.error('Google login error:', error);
    
    return { 
      success: false, 
      error: error.code || 'unknown_error',
      message: getErrorMessage(error.code)
    };
  }
};

// Regular login with email/password
export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const token = await userCredential.user.getIdToken();
    
    // Get additional user data from your backend
    const response = await axios.get(`${API_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    const user = {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      name: response.data.name,
      phoneNumber: response.data.phoneNumber,
      token
    };
    
    localStorage.setItem('user', JSON.stringify(user));
    setAuthToken(token);
    
    return { success: true, user };
  } catch (error) {
    console.error('Login error:', error);
    
    return { 
      success: false, 
      error: error.code || 'unknown_error',
      message: getErrorMessage(error.code)
    };
  }
};

// Logout user
export const logout = async () => {
  try {
    await signOut(auth);
    localStorage.removeItem('user');
    setAuthToken(null);
    return { success: true };
  } catch (error) {
    console.error('Logout error:', error);
    return { 
      success: false, 
      error: error.code || 'unknown_error',
      message: getErrorMessage(error.code)
    };
  }
};

// Get current user from localStorage
export const getCurrentUser = () => {
  try {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

// Reset password
export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (error) {
    console.error('Reset password error:', error);
    return { 
      success: false, 
      error: error.code || 'unknown_error',
      message: getErrorMessage(error.code)
    };
  }
};

// Check if an email is already registered
export const checkEmailExists = async (email) => {
  try {
    // This method attempts to sign in with an invalid password
    // If "auth/wrong-password" is returned, it means the email exists
    // If "auth/user-not-found" is returned, it means the email doesn't exist
    await signInWithEmailAndPassword(auth, email, "check-only");
    return true; // This line won't be reached due to wrong password
  } catch (error) {
    if (error.code === 'auth/wrong-password') {
      // Email exists
      return true;
    }
    // Email doesn't exist or other error
    return false;
  }
};