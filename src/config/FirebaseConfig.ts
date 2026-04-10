// Import the functions you need from the SDKs you need
import Constants from "expo-constants";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: Constants.expoConfig?.extra?.APIKEY,
  authDomain: Constants.expoConfig?.extra?.AUTHDOMAIN,
  projectId: Constants.expoConfig?.extra?.PROJECTID,
  storageBucket: Constants.expoConfig?.extra?.STORAGEBUCKET,
  messagingSenderId: Constants.expoConfig?.extra?.MESSAGINGSENDERID,
  appId: Constants.expoConfig?.extra?.APPID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)