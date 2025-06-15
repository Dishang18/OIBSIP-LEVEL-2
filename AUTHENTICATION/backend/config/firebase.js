const admin = require('firebase-admin');

// Direct import of the JSON file - no string parsing needed!
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;