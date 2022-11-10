import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import {db} from "../firebase.js";

export const handleNew = async () => {
  const name = prompt("Enter order name");
  const value = prompt("Enter order value");

  const collectionRef = collection(db, "Orders");
  const payload = { name, value };
  const docRef = await addDoc(collectionRef, payload);
  console.log("The new ID is: " + docRef.id);
};

export const handleEdit = async (id) => {
  const docRef = doc(db, "Orders", id);
  const payload = {  };

  setDoc(docRef, payload);
};