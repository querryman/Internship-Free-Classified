// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCJrpo-KCWt7CGq68f4SjxNrVGP57Of2SI",
  authDomain: "olx-clone-4f23c.firebaseapp.com",
  projectId: "olx-clone-4f23c",
  storageBucket: "olx-clone-4f23c.firebasestorage.app",
  messagingSenderId: "230448454836",
  appId: "1:230448454836:web:71bf63fb1f324dcada8be1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const googleProvier = new GoogleAuthProvider()