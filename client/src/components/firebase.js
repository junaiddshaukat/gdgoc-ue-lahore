
// lib/firebase.js
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBVVqHX4XvoCZWEDYFE4KtklaUR_XPKDm0",
  authDomain: "ue-book-club.firebaseapp.com",
  projectId: "ue-book-club",
  storageBucket: "ue-book-club.appspot.com",
  messagingSenderId: "637451155361",
  appId: "1:637451155361:web:bac279a3b85ad093a0bde0",
  measurementId: "G-HLQWHQY4J5"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Storage
const storage = getStorage(app);

export { storage };