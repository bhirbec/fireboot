const functions = require('firebase-functions');

// the `src` folder is copied over the `functions/src` via
// a `predeploy hook` in firebase.json
const app = require('src/backend/app')

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions
exports.app = functions.https.onRequest(app);
