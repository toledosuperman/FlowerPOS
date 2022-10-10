import { initializeApp, db } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { useForm } from "react-hook-form";
import React, { useState, useEffect } from "react";
import { UserAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

function CreateRecipe({ values, submit }) {
return (
    <form>
        <div className='max-w-[700px] mx-auto my-16 p-4'>
        <h1>Create Recipe</h1>

    </div>
    </form>
  );
};
export default CreateRecipe;