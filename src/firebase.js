// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth ,GoogleAuthProvider} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCyqe9nRAMx5N4yOkB9BeSlczMLwc6aD-k",
  authDomain: "mealmastermind-4e4c7.firebaseapp.com",
  projectId: "mealmastermind-4e4c7",
  storageBucket: "mealmastermind-4e4c7.appspot.com",
  messagingSenderId: "556013365536",
  appId: "1:556013365536:web:65ebaa8167bd16d2670f45",
  measurementId: "G-KYF1S3ZJDJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export { GoogleAuthProvider };