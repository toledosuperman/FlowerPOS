import {
    collection,
    addDoc,
    doc,
    deleteDoc,
    getDocs,
    updateDoc
  } from "firebase/firestore";

import { db } from '../firebase'

async function getAllProducts() {
    try {
        const colRef = collection(db, "Products");
        const docsSnap = await getDocs(colRef);
        docsSnap.forEach(doc => {
            console.log(doc.data());
            console.log(doc.id);
        })
       return docsSnap;
        
    } catch (error) {
        console.log(error);
    }
    
};



function AddNewProduct(Name, Price, Inventory, Type, Cost) {
    
    const docRef = addDoc(collection(db, "Products"), {
        Name,
        Price,
        Inventory,
        Type,
        Countable: false,
        Cost
      });
      console.log("Document written with ID: ", docRef.id);

    };


function UpdateProduct(Name, Price, Inventory, Type, Countable,Cost) {
    const docRef = doc(db, "Products", Name);

    const data = {
        Name,
        Price,
        Inventory,
        Type,
        Countable,
        Cost
      };
      
      updateDoc(docRef, data)
      .then(docRef => {
          console.log("Value of an Existing Document Field has been updated");
      })
      .catch(error => {
          console.log(error);
      })
}

function DeleteProduct(Name) {
    const docRef = doc(db, "Products", Name);

deleteDoc(docRef)
.then(() => {
    console.log("Entire Document has been deleted successfully.")
})
.catch(error => {
    console.log(error);
})
}
const FireStoreService = {
    getAllProducts, AddNewProduct, UpdateProduct, DeleteProduct
  };

export default  FireStoreService
  