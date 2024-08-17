import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD0XhryXhlRMVWf3uAapa0X2BwvZUEGhgY",
  authDomain: "story-demo-cbd02.firebaseapp.com",
  projectId: "story-demo-cbd02",
  storageBucket: "story-demo-cbd02.appspot.com",
  messagingSenderId: "298696764133",
  appId: "1:298696764133:web:13a8c98fad652e5af5820c",
  measurementId: "G-H9V5N2SMQW",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const signInWithGoogle = () => signInWithPopup(auth, provider);

export { auth, signInWithGoogle };
