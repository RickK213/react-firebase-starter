const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const ADMIN_EMAIL_ADDRESS = 'admin@yourdomain.com';

const onAuthUserCreate = functions.auth.user().onCreate(user => {
  const uid = user.uid;
  const email = user.email;

  const roles = ['BASE_USER'];
  if (email === ADMIN_EMAIL_ADDRESS) {
    roles.push('ADMIN');
  }

  return admin.firestore().doc(`users/${uid}`).set({ email, roles }, { merge: true });
});

module.exports = onAuthUserCreate;
