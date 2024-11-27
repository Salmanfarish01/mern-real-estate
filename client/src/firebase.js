// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-b47bf.firebaseapp.com",
  projectId: "mern-estate-b47bf",
  storageBucket: "mern-estate-b47bf.firebasestorage.app",
  messagingSenderId: "1084865565504",
  appId: "1:1084865565504:web:e77fab5332af73022a60a5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);