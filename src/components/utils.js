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
    const CustomerName = prompt("Enter Customer name");
    const CustomerPhone = prompt("Enter Customer Phone");
    const CustomerEmail = prompt("Enter CustomerEmail ");
    const CustomerAddress = prompt("Enter Customer Address ");
    const CustomerCity = prompt("Enter Customer City ");
    const CustomerZip = prompt("Enter Customer Zip code ");
    const CustomerState = prompt("Enter Customer State ");
    const Product = prompt("Enter Product ");
    const  DeliveryDate = prompt("Enter Delivery Date: ");
    const  RecipientName = prompt("Enter Recipient Name ");
    const  RecipientPhone = prompt("Enter Recipient Phone ");
    const RecipientAddress = prompt("Enter Recipient Address ");
    const RecipientCity = prompt("Enter Recipient City ");
    const RecipientZip = prompt("Enter  Recipient Zip");
    const RecipientState = prompt("Enter Recipient State ");





  const docRef = doc(db, "Orders", id);
  const payload = {  };

  setDoc(docRef, payload);
};