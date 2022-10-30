import { db } from '../firebase'

function getAllProducts() {
    return new Promise((resolve, reject) => {
        db.collection("Products").get().then((allProducts) => {
            resolve(allProducts);
        }).catch((e) => {
            reject(e);
        })
    })
}

function getAllProductCategories() {
    return new Promise((resolve, reject) => {
        db.collection("ProductCategories").get().then((allProductCategories) => {
            resolve(allProductCategories);
        }).catch((e) => {
            reject(e);
        })
    })
}

function AddNewProduct(Name, Type, Price) {
    return new Promise((resolve, reject) => {
        const data = {
            "Name": Name,
            "Type": Type,
            "Price": parseFloat(Price)
        }

        db.collection("Products").add(data).then((docRef) => {
            resolve(docRef);
        }).catch((e) => {
            reject(e);
        })

    })
}

function UpateProduct(id, Name, Type, Price) {

    return new Promise((resolve, reject) => {

        const data = {
            "Name": Name,
            "Type": Type,
            "Price": parseFloat(Price)
        }

        db.collection("Products").doc(id).update(data).then(() => {
            resolve()
        }).catch((e) => {
            reject(e)
        })
    })
}

function DeleteProduct(id) {
    return new Promise((resolve, reject) => {
        db.collection("Products").doc(id).delete().then(() => {
            resolve()
        }).catch((e) => {
            reject(e)
        })
    })
}

export default { getAllProducts, getAllProductCategories, AddNewProduct, UpateProduct, DeleteProduct }
  