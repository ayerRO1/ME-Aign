import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBaDJzV7rj1kpMgNk9Mfa2on8dfF8lRF2c",
  authDomain: "me-align.firebaseapp.com",
  projectId: "me-align",
  storageBucket: "me-align.firebasestorage.app",
  messagingSenderId: "566449489274",
  appId: "1:566449489274:web:65da0922dfad4bc65c42c3"
};

export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
