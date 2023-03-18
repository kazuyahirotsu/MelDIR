// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: 'AIzaSyBl55BDBjlHfkPdt_ULkQTlMbsyKgBqKoU',
//   authDomain: 'meldir.firebaseapp.com',
//   projectId: 'meldir',
//   storageBucket: 'meldir.appspot.com',
//   messagingSenderId: '577967055371',
//   appId: '1:577967055371:web:352f8b459eb078151ddd0e',
//   measurementId: 'G-EE7SMBTMMM',
// };

const firebaseConfig = {
  apiKey: 'AIzaSyBHdj7SZf_toAjI8vEvlRDcm1n9JXzdBLQ',
  authDomain: 'hotsort-d2670.firebaseapp.com',
  projectId: 'hotsort-d2670',
  storageBucket: 'hotsort-d2670.appspot.com',
  messagingSenderId: '166769607292',
  appId: '1:166769607292:web:e548f6d0ee3d843d233ff9',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
