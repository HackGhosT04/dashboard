// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBn2NLrJ2BjYrVdR7JbgR7FEP5oWR-_8lk",
  authDomain: "brilliantbridge-62450.firebaseapp.com",
  databaseURL: "https://brilliantbridge-62450-default-rtdb.firebaseio.com",
  projectId: "brilliantbridge-62450",
  storageBucket: "brilliantbridge-62450.firebasestorage.app",
  messagingSenderId: "928709655185",
  appId: "1:928709655185:web:467c5174da7ddcf27f9d30",
  measurementId: "G-MF8VPVZ55B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const database = getDatabase(app);

export { app, auth, database, analytics };
