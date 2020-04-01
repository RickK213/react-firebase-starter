import app from 'firebase/app';
import { FIREBASE_CONFIG } from '../../../private/firebase-config';
import 'firebase/auth';

class Firebase {
  constructor() {
    // This check is to prevent firebase app/duplicate-app error on hot-reload:
    if (!app.apps.length) {
      app.initializeApp(FIREBASE_CONFIG);
    }

    this.auth = app.auth();
  }

  // *** Auth API ***
  // TODO: These endpoints are called asynchronously and need to be resolved
  //       and handle errors
  doCreateUserWithEmailAndPassword = (email, password) => {
    return this.auth.createUserWithEmailAndPassword(email, password);
  };

  doSignInWithEmailAndPassword = (email, password) => {
    this.auth.signInWithEmailAndPassword(email, password);
  };

  doSignOut = () => {
    this.auth.signOut();
  };

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);
}

export default Firebase;
