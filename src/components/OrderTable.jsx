import { collection, getDocs } from "firebase/firestore"
import React,{ useEffect,useState } from "react"
import {db} from '../firebase'

export default function ListOrders() {
    const [Orders, setOrders] = useState([])
    useEffect(()=>{
    getOrders()
},[])
    useEffect(()=> {
        console.log(Orders)
    },[Orders]
    )
    function getOrders(){
        const orderCollectionRef = collection(db,'Orders')
        getDocs(orderCollectionRef)
            .then(response =>{
                const ord = response.docs.map(doc => ({
                    data: doc.data(),
                    id: doc.id,
                }))
                setOrders(ord)
            })
            .catch(error => console.log(error.message))
    };
    return (
        <div>

            <ul>
                {Orders.map(order =><li key={order.id}>{order.data.Name}</li>)}
            </ul>
        </div>
    );
};