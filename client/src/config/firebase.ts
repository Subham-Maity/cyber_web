// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBZVFOixXZnDRBFflpzjQravwRq5UFcFV0",
    authDomain: "job-portal-dd703.firebaseapp.com",
    projectId: "job-portal-dd703",
    storageBucket: "job-portal-dd703.appspot.com",
    messagingSenderId: "1095931118541",
    appId: "1:1095931118541:web:754de4e095ab439a55ba84"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);