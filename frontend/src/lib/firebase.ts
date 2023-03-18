// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBl55BDBjlHfkPdt_ULkQTlMbsyKgBqKoU",
  authDomain: "meldir.firebaseapp.com",
  projectId: "meldir",
  storageBucket: "meldir.appspot.com",
  messagingSenderId: "577967055371",
  appId: "1:577967055371:web:352f8b459eb078151ddd0e",
  measurementId: "G-EE7SMBTMMM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);