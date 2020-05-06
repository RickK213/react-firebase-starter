import app from 'firebase/app';
import { FIREBASE_CONFIG } from '../../../firebase-config/firebase-config.private';
import 'firebase/auth';
import 'firebase/firestore';
import { ROUTES } from '../../constants/routes';

const baseUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://react-firebase-starter-dacdd.web.app'
    : 'http://localhost:3000';

const CONFIRMATION_EMAIL_REDIRECT = `${baseUrl}${ROUTES.HOME.path}`;

class Firebase {
  constructor() {
    // This check is to prevent firebase app/duplicate-app error on hot-reload:
    if (!app.apps.length) {
      app.initializeApp(FIREBASE_CONFIG);
    }

    this.fieldValue = app.firestore.FieldValue;
    this.auth = app.auth();
    this.db = app.firestore();
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

  doSendEmailVerification = () =>
    this.auth.currentUser.sendEmailVerification({
      url: CONFIRMATION_EMAIL_REDIRECT
    });

  // *** Merge Auth and DB User API *** //
  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .get()
          .then(snapshot => {
            const dbUser = snapshot.data();
            // default empty roles
            if (!dbUser.roles) {
              dbUser.roles = [];
            }
            // merge auth and db user
            const mergedUser = {
              uid: authUser.uid,
              email: authUser.email,
              emailVerified: authUser.emailVerified,
              providerData: authUser.providerData,
              ...dbUser
            };
            next(mergedUser);
          });
      } else {
        fallback();
      }
    });

  // *** User API ***
  user = uid => this.db.doc(`users/${uid}`);

  users = () => this.db.collection('users');

  // *** To Do API ***
  toDo = uid => this.db.doc(`toDos/${uid}`);

  toDos = () => this.db.collection('toDos');
}

export default Firebase;
