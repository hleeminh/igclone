import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,
  onAuthStateChanged, signOut} from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, setDoc, updateDoc, 
  doc, initializeFirestore, collectionGroup, onSnapshot, where, query, 
  serverTimestamp, arrayUnion, arrayRemove, orderBy
} from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAsJmPtYX8dEeWVERtjI8K7nVA-yH_4O6c",
  authDomain: "rn-instagram-clone-ee7d0.firebaseapp.com",
  projectId: "rn-instagram-clone-ee7d0",
  storageBucket: "rn-instagram-clone-ee7d0.appspot.com",
  messagingSenderId: "377522802025",
  appId: "1:377522802025:web:5926bf2322a1b0a96881f8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// const db = getFirestore(app)
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true
  })

export {
  auth,
  db,
  getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut,
  getFirestore, collection, addDoc, getDocs, setDoc, updateDoc, doc, initializeFirestore, 
  collectionGroup, onSnapshot, where, query, serverTimestamp, arrayUnion, arrayRemove, orderBy
}

