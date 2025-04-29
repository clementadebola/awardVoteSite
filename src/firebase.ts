import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDW46h9PE0kO8_ZruqAtqgW4G4xB1SWMFE",
//   authDomain: "umzrm-9dfd2.firebaseapp.com",
//   projectId: "umzrm-9dfd2",
//   storageBucket: "umzrm-9dfd2.appspot.com",
//   databaseURL:'https://umzrm-9dfd2-default-rtdb.europe-west1.firebasedatabase.app/',
//   messagingSenderId: "208875449956",
//   appId: "1:208875449956:web:92192b2c5961fb8aa83971"
// };

const firebaseConfig = {
  apiKey: "AIzaSyBpXdo3VrGepj0Opdck1HW_CHrnYeaWpR4",
  authDomain: "votingsite-56765.firebaseapp.com",
  projectId: "votingsite-56765",
  storageBucket: "votingsite-56765.appspot.com",
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
