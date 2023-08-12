// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBHxvKgXn6kscKgmhCTl54sprFSON6PMKA",
  authDomain: "nomoapp-auth.firebaseapp.com",
  projectId: "nomoapp-auth",
  storageBucket: "nomoapp-auth.appspot.com",
  messagingSenderId: "819569480741",
  appId: "1:819569480741:web:c3b0e7e6a83fe6db50dbcc",
  measurementId: "G-299XBW2E3N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app