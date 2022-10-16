import { getDatabase } from "firebase/database";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore,
  query,
  orderBy,
  onSnapshot,
  collection,
  getDoc, 
  getDocs, 
  addDoc,
  updateDoc,
  doc, 
  serverTimestamp, 
  arrayUnion } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDcc1jnbceSvBcBmDuN2nnMzMqAw3euNqE",
  authDomain: "flowerpos-1dec4.firebaseapp.com",
  databaseURL: "https://flowerpos-1dec4-default-rtdb.firebaseio.com",
  projectId: "flowerpos-1dec4",
  storageBucket: "flowerpos-1dec4.appspot.com",
  messagingSenderId: "514427894287",
  appId: "1:514427894287:web:d115bf119e7eb69048c17a",
  measurementId: "G-D9XSKRBLXV"
  };
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
 export const database = getDatabase();
  export const auth = getAuth(app);
  export {db,app}
  