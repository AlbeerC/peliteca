// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCX2sUctUAX_47rpBeJb4KCmABox6abx1A",
  authDomain: "peliteca-2024.firebaseapp.com",
  projectId: "peliteca-2024",
  storageBucket: "peliteca-2024.appspot.com",
  messagingSenderId: "981008498552",
  appId: "1:981008498552:web:38fe4ed2b328594d11d28d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

export { auth, db }