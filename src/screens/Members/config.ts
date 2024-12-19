
// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDXFB5Q2c1IYZFB2E6ruTOXv3l7aSrGaOc",
  authDomain: "crypto-3e5e1.firebaseapp.com",
  projectId: "crypto-3e5e1",
  storageBucket: "crypto-3e5e1.firebasestorage.app",
  messagingSenderId: "802607168908",
  appId: "1:802607168908:web:22637aced5bec381f5eaa9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };