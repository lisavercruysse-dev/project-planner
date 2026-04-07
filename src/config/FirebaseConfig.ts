// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDAjBm0oiWHEOPSZNzZs2OPqQNp4hmR8AU",
  authDomain: "project-planner-lisa.firebaseapp.com",
  projectId: "project-planner-lisa",
  storageBucket: "project-planner-lisa.firebasestorage.app",
  messagingSenderId: "197964480827",
  appId: "1:197964480827:web:fe57819fed6ffd5929b71e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)