
// lib/firebase.js
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDGDWmQgyIVkvpN9a1cxCHmcb0CKRDoUzM",
    authDomain: "gdgoc-ue.firebaseapp.com",
    projectId: "gdgoc-ue",
    storageBucket: "gdgoc-ue.appspot.com", // Change this line
    messagingSenderId: "928788036815",
    appId: "1:928788036815:web:d43a4ce841f3274b624bba",
    measurementId: "G-EDHQVFF4DF"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Storage
const storage = getStorage(app);

export { storage };