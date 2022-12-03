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



function AddNewProduct(Name, Price, Inventory, Type) {
    
    const docRef = addDoc(collection(db, "Products"), {
        Name,
        Price: Number(Price),
        Inventory: Number(Inventory),
        Type,
        Countable: false,

      });
      console.log("Document written with ID: ", docRef.id);

    };


async function UpdateProduct(id, Name, Price, Inventory, Type) {
    const docRef = doc(db, "Products", id);

    const data = {
        Name,
        Price: Number(Price),
        Inventory: Number(Inventory),
        Type,
      };
      
      try {
        await updateDoc(docRef, data);
        console.log("Value of an Existing Document Field has been updated");
    } catch (error) {
        console.log(error);
    }
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
async function getAllOrders() {
     try {
            const colRef = collection(db, "Orders");
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



function AddNewOrder(CustomerAddress,CustomerCity,CustomerEmail,CustomerName,CustomerPhone,CustomerState,
 CustomerZip,DeliveryDate,Product,  RecipientAddress, RecipientCity,RecipientName,RecipientPhone,RecipientState,
 RecipientZip, created) {

    const docRef = addDoc(collection(db, "Orders"), {
        CustomerAddress,
        CustomerCity,
        CustomerEmail,
        CustomerName,
        CustomerPhone,
        CustomerState,
        CustomerZip,
        DeliveryDate,
        Product,
        RecipientAddress,
        RecipientCity,
        RecipientName,
        RecipientPhone,
        RecipientState,
        RecipientZip,
        completed: false,
        created
      });

      console.log("Document written with ID: ", docRef.id);

    };


async function UpdateOrder(id, CustomerAddress,CustomerCity,CustomerEmail,CustomerName,CustomerPhone,CustomerState,
CustomerZip,DeliveryDate,Product,  RecipientAddress, RecipientCity,RecipientName,RecipientPhone,RecipientState,
RecipientZip, created) {
    const docRef = doc(db, "Orders", id);

    const data = {
        CustomerAddress,
        CustomerCity,
        CustomerEmail,
        CustomerName,
        CustomerPhone,
        CustomerState,
        CustomerZip,
        DeliveryDate,
        Product,
        RecipientAddress,
        RecipientCity,
        RecipientName,
        RecipientPhone,
        RecipientState,
        RecipientZip,
        //completed:Boolean(completed),
        created
      };

      try {
              await updateDoc(docRef, data);
              console.log("Value of an Existing Document Field has been updated");
          } catch (error) {
              console.log(error);
          }
}

function DeleteOrder(CustomerName) {
    const docRef = doc(db, "Orders", CustomerName);

deleteDoc(docRef)
.then(() => {
    console.log("Entire Document has been deleted successfully.")
})
.catch(error => {
    console.log(error);
})
}
async function getAllUsers() {
    try {
        const colRef = collection(db, "users");
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



function AddNewUsers(posusername, email, role) {
    
    const docRef = addDoc(collection(db, "users"), {
        posusername,
       email,
        
        role

      });
      console.log("Document written with ID: ", docRef.id);

    };


async function UpdateUsers(id, posusername, role) {
    const docRef = doc(db, "users", id);

    const data = {
        posusername,
      
      
        role,
      };
      
      try {
        await updateDoc(docRef, data);
        console.log("Value of an Existing Document Field has been updated");
    } catch (error) {
        console.log(error);
    }
}

function DeleteUsers(posusername) {
    const docRef = doc(db, "users", posusername);

deleteDoc(docRef)
.then(() => {
    console.log("Entire Document has been deleted successfully.")
})
.catch(error => {
    console.log(error);
})
}
const FireStoreService = {
    getAllProducts, AddNewProduct, UpdateProduct, DeleteProduct, getAllOrders, AddNewOrder, UpdateOrder, DeleteOrder,AddNewUsers, getAllUsers, UpdateUsers, DeleteUsers,
  };

export default  FireStoreService
  