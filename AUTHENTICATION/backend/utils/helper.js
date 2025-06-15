const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// Hash password reset token
const hashToken = (token) => {
  return crypto.createHash('sha256').update(token).digest('hex');
};

// Generate random token for password reset
const generateResetToken = () => {
  const resetToken = crypto.randomBytes(32).toString('hex');
  const hashedToken = hashToken(resetToken);
  
  // Token expires in 10 minutes
  const tokenExpiry = Date.now() + 10 * 60 * 1000;
  
  return { resetToken, hashedToken, tokenExpiry };
};

// Verify Firebase token
const verifyFirebaseToken = async (idToken, firebaseAdmin) => {
  try {
    const decodedToken = await firebaseAdmin.auth().verifyIdToken(idToken);
    return decodedToken;
  } catch (error) {
    throw new Error('Invalid or expired Firebase token');
  }
};

module.exports = {
  generateToken,
  hashToken,
  generateResetToken,
  verifyFirebaseToken
};