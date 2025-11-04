
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBq5gCeY6sscgBIXb1DBdK9GER7U22LfHU",
  authDomain: "myproject-50f6a.firebaseapp.com",
  projectId: "myproject-50f6a",
  storageBucket: "myproject-50f6a.firebasestorage.app",
  messagingSenderId: "79696247435",
  appId: "1:79696247435:web:00c5cf6b64c0179bfa328e",
  measurementId: "G-R5KTN1E7C6",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
