// Import Firebase functions to initialize app and use Firestore
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration using environment variables (from .env)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,              // Firebase API key
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,      // Auth domain
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,        // Project ID
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET, // Storage bucket
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID, // Messaging sender ID
  appId: import.meta.env.VITE_FIREBASE_APP_ID                 // App ID
};

// Initialize Firebase app with the config
const app = initializeApp(firebaseConfig);

// Export Firestore instance to use elsewhere in your app
export const db = getFirestore(app);
