import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCLQwMBKbwk1cdOZKJyz1LMxmdKVYJ2wcM",
  authDomain: "lendarymotorsport.firebaseapp.com",
  projectId: "lendarymotorsport",
  storageBucket: "lendarymotorsport.firebasestorage.app",
  messagingSenderId: "667702290044",
  appId: "1:667702290044:web:39a0badbebf4c7b8510bf9"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export {db, auth, storage}