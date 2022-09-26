import { initializeApp, db } from 'firebase/app';

class DatabaseService {
    collection;
  
    // Specify  collection name
    constructor(Orders) {
      this.collection = db.collection(Orders);
    }
  
    // returns list of records as an array of javascript objects
    getAll = async () => {
      const snapshot = await this.collection.get();
      return snapshot.docs.map((doc) => {
        return {
          id: doc.id, // append document id to each document
          ...doc.data(),
        };
      });
    };
  
    // returns a single document in object format
    getOne = async ({ queryKey }) => {
      const { id } = queryKey[1];
      if (!id) return; // entity form is in create mode
      const snapshot = await this.collection.doc(id).get();
      return snapshot.data();
    };
  
    // resolve a relation, returns the referenced document
    getReference = async (documentReference) => {
      const res = await documentReference.get();
      const data = res.data();
  
      if (data && documentReference.id) {
        data.uid = documentReference.id;
      }
  
      return data;
    };
  
    // save a new document in the database
    create = async (data) => {
      return await this.collection.add(data);
    };
  
    // update an existing document with new data
    update = async (id, values) => {
      return await this.collection.doc(id).update(values);
    };
  
    // delete an existing document from the collection
    remove = async (id) => {
      return await this.collection.doc(id).delete();
    };
  }
  
  // Create services for each entity type
  export const OrdersService = new DatabaseService("orders");