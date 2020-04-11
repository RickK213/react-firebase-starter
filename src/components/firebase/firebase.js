import app from 'firebase/app';
import { FIREBASE_CONFIG } from '../../../private/firebase-config';
import 'firebase/auth';
import 'firebase/database';

class Firebase {
  constructor() {
    // This check is to prevent firebase app/duplicate-app error on hot-reload:
    if (!app.apps.length) {
      app.initializeApp(FIREBASE_CONFIG);
    }

    this.auth = app.auth();
    this.db = app.database();
  }

  // *** Auth API ***
  doCreateUserWithEmailAndPassword = (email, password) => {
    return this.auth.createUserWithEmailAndPassword(email, password);
  };

  doSignInWithEmailAndPassword = (email, password) => {
    return this.auth.signInWithEmailAndPassword(email, password);
  };

  doSignOut = () => {
    return this.auth.signOut();
  };

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  // *** User API ***
  user = uid => this.db.ref(`users/${uid}`);

  users = () => this.db.ref('users');
}

export default Firebase;
