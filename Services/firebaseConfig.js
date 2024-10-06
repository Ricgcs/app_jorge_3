// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'; // Corrige a importação do getAuth

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7rDFUIxFzd5QIIccdgIce1u5TNRWKw64",
  authDomain: "jorge2-90ea2.firebaseapp.com",
  projectId: "jorge2-90ea2",
  storageBucket: "jorge2-90ea2.appspot.com",
  messagingSenderId: "659647712995",
  appId: "1:659647712995:web:1608d1dfa3e335be80bfd6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Exporte o auth corretamente
export const auth = getAuth(app);
