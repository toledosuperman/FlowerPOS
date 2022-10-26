import { collection, getDocs } from "firebase/firestore"
import React,{ useEffect,useState } from "react"
import {db} from '../firebase'

export default function ListCustomers() {
    const [customers, setCustomers] = useState([])
    useEffect(()=>{
    getCustomers()
},[])
    useEffect(()=> {
        console.log(customers)
    },[customers]
    )
    function getCustomers(){
        const customerCollectionRef = collection(db,'Customer')
        getDocs(customerCollectionRef)
            .then(response =>{
                const cust = response.docs.map(doc => ({
                    data: doc.data(),
                    id: doc.id,
                }))
                setCustomers(cust)
            })
            .catch(error => console.log(error.message))
    };
    return (
        <div class="container">
                 <h3>  
             Customers</h3>
            <ul>
                {customers.map(customer =>(
                <li key={customer.id}>{customer.data.name}</li>))}
            </ul>
            
        </div>
    );
};