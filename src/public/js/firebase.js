import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBjzVPxqRTFXAQc8hf7wQETnUc1ZOnsmok",
    authDomain: "recipe-repository-1e6cf.firebaseapp.com",
    projectId: "recipe-repository-1e6cf",
    storageBucket: "recipe-repository-1e6cf.firebasestorage.app",
    messagingSenderId: "620937608114",
    appId: "1:620937608114:web:8dc13aa8f6a839def802ab"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
