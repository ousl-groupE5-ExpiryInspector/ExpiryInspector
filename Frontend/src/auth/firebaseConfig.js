import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAzprSrCzbesZCEfEw73lgzkr4-53Bnb4o",
  authDomain: "expiryinspector.firebaseapp.com",
  projectId: "expiryinspector",
  storageBucket: "expiryinspector.appspot.com",
  messagingSenderId: "965392943431",
  appId: "1:965392943431:android:564e2cacfe1b078ad96462"
};

// Initialize Firebase app only if no apps are initialized
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { auth };
