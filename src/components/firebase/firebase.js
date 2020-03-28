import app from 'firebase/app';
import { FIREBASE_CONFIG } from '../../../private/firebase-config';

class Firebase {
  constructor() {
    app.initializeApp(FIREBASE_CONFIG);
  }
}

export default Firebase;
