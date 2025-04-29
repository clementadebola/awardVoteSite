import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBpXdo3VrGepj0Opdck1HW_CHrnYeaWpR4",
  authDomain: "votingsite-56765.firebaseapp.com",
  projectId: "votingsite-56765",
  storageBucket: "votingsite-56765.firebasestorage.app",
  messagingSenderId: "224274695707",
  appId: "1:224274695707:web:b829c86c1ef3328d8a5abe",
  measurementId: "G-SPGFRD7XQQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const database = getDatabase(app); 
export const storage = getStorage(app);
