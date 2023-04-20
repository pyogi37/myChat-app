import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAYEsVQQFu3iLlIU807-gM1UBPcD6u65Us",
  authDomain: "mychat-522dd.firebaseapp.com",
  projectId: "mychat-522dd",
  storageBucket: "mychat-522dd.appspot.com",
  messagingSenderId: "750410888333",
  appId: "1:750410888333:web:75903ff6ce09e9a7269ec4",
  measurementId: "G-29G0EP9CEE",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore(app);
