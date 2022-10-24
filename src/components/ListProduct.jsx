import { collection, getDocs } from "firebase/firestore"
import React,{ useEffect,useState } from "react"
import {db} from '../firebase'

export default function ListProducts() {
    const [products, setProducts] = useState([])
    useEffect(()=>{
    getProducts()
},[])
    useEffect(()=> {
        console.log(products)
    },[products]
    )
    function getProducts(){
        const productCollectionRef = collection(db,'Products')
        getDocs(productCollectionRef)
            .then(response =>{
                const prod = response.docs.map(doc => ({
                    data: doc.data(),
                    id: doc.id,
                }))
                setProducts(prod)
            })
            .catch(error => console.log(error.message))
    };
    return (
        <div>
            <ol style={{ listStyleType: 'lower-alpha' }}>
            
                {products.map(product =>(<li key={product.id}>{product.data.Name}</li>))}
            
            </ol>
        </div>
    );
};