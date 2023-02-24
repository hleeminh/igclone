import firebase from "firebase/compat/app" 
require('firebase/auth')

const firebaseConfig = {
  apiKey: "AIzaSyAsJmPtYX8dEeWVERtjI8K7nVA-yH_4O6c",
  authDomain: "rn-instagram-clone-ee7d0.firebaseapp.com",
  projectId: "rn-instagram-clone-ee7d0",
  storageBucket: "rn-instagram-clone-ee7d0.appspot.com",
  messagingSenderId: "377522802025",
  appId: "1:377522802025:web:5926bf2322a1b0a96881f8"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
!firebase.apps.length 
? firebase.initializeApp(firebaseConfig) 
: firebase.app()

export default firebase