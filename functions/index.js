const functions = require('firebase-functions');
const app = require('./server')

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions
exports.app = functions.https.onRequest(app);
