
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDcc1jnbceSvBcBmDuN2nnMzMqAw3euNqE",
    authDomain: "flowerpos-1dec4.firebaseapp.com",
    projectId: "flowerpos-1dec4",
    storageBucket: "flowerpos-1dec4.appspot.com",
    messagingSenderId: "514427894287",
    appId: "1:514427894287:web:d115bf119e7eb69048c17a",
  };
  
 
  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  export default app