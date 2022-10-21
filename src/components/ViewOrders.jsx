import { initializeApp, db } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { useForm } from "react-hook-form";
import React, { useState, useEffect } from "react";
import { UserAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';

import Table from 'react-bootstrap/Table';
import TableWithAPI from './APITable.js';


function SelectAllData(){
firebase.database().ref('Orders').once('value',
    function(AllRecords){
    AllRecords.forEach(
        function(CurrentRecord){
        var state =CurrentRecord.val().RecipientState
        AddItemsToTable(state);
        }
    );
    }
    );
}
function AddItemsToTable(state){
var tbody = document.getElementById('tbody1');
var trow = document.createElement('tr');
var td1 = document.createElement('td');
td1.innerHTML = state;
trow.appendChild(td1);
tbody.appendChild(trow);
}

const ViewOrders = () => {
return (

 <div className='max-w-[600px] mx-auto my-16 p-4'>
              <h1 className='text-2xl font-bold py-4'>View orders</h1>
    <script>
    window.onload= SelectAllData;
    </script>
    <table>
    <thead>
    <th>product</th>
    </thead>
    <tbody id ="tbody 1">
    <tr>
    <td></td>
    </tr>
    </tbody>
    </ table>
<script src="https://www.gstatic.com/firebasejs/7.15.5/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/7.15.5/firebase-auth.js"></script>
<script src="https://www.gstatic.com/firebasejs/7.15.5/firebase-database.js"></script>
</div>

);
};

export default ViewOrders;