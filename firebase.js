// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCftF4KeabxRRA-9PaWtciKg0vfkneme9I",
  authDomain: "harcamatakibi.firebaseapp.com",
  projectId: "harcamatakibi",
  storageBucket: "harcamatakibi.firebasestorage.app",
  messagingSenderId: "403213115092",
  appId: "1:403213115092:web:1c5a0e6e8be293a14c2541",
  measurementId: "G-N4MLFSGDE7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);