// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyD0W_a2xdkxNngjQTDYCHxakmf6PusVypI",
//   authDomain: "test-c03d1.firebaseapp.com",
//   databaseURL: "https://test-c03d1-default-rtdb.firebaseio.com",
//   projectId: "test-c03d1",
//   storageBucket: "test-c03d1.appspot.com",
//   messagingSenderId: "942291925720",
//   appId: "1:942291925720:web:d87e5ba6a53d7e88fcf5ad"
// };
const firebaseConfig = {
  apiKey: "AIzaSyCooghec9b5CwlTs9vQmFB5nUhBtJdyNT0",
  authDomain: "labmaster-webapp.firebaseapp.com",
  databaseURL: "https://labmaster-webapp-default-rtdb.firebaseio.com",
  projectId: "labmaster-webapp",
  storageBucket: "labmaster-webapp.appspot.com",
  messagingSenderId: "608623253394",
  appId: "1:608623253394:web:3c0daa9cebe3385b19534b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database=getDatabase(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const storage =getStorage(app)
export {database, auth, signInWithPopup, provider,storage};