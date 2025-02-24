import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyAzprSrCzbesZCEfEw73lgzkr4-53Bnb4o",
  authDomain: "expiryinspector.firebaseapp.com",
  projectId: "expiryinspector",
  storageBucket: "expiryinspector.appspot.com",
  messagingSenderId: "965392943431",
  appId: "1:965392943431:android:564e2cacfe1b078ad96462"
};

// Ensure Firebase is initialized only once
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// ✅ Enable persistent login storage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

const firestore = getFirestore(app);

export { app, auth, firestore };
