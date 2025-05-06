import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCSZ8ulVZ5Zq98PQDikIBfPcgu94yvxzJQ",
  authDomain: "toystore-12b24.firebaseapp.com",
  projectId: "toystore-12b24",
  storageBucket: "toystore-12b24.firebasestorage.app",
  messagingSenderId: "549700752946",
  appId: "1:549700752946:web:249c38507fbae414398e2b"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
