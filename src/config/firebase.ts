// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB7mH84FD-PrMo3_VMVZR7LixO7UBeSzjw",
  authDomain: "lifespan-8fbcf.firebaseapp.com",
  projectId: "lifespan-8fbcf",
  storageBucket: "lifespan-8fbcf.firebasestorage.app",
  messagingSenderId: "254216981303",
  appId: "1:254216981303:web:48e50a4159126a9dd128b2",
  measurementId: "G-G8JM0PM66N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app); 

export { app, analytics };