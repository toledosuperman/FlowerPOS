import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import Footer from './footer';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordtwo, setPasswordtwo]= useState('');
  const [error, setError] = useState('');
  const { createUser } = UserAuth();
  const navigate = useNavigate();
  const isInvalid =
  password !== passwordtwo 
  ;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await createUser(email, password);
      navigate('/Account')
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  };

  return (
   
    // <div className='max-w-[700px] mx-auto my-16 p-4'>
    //   <div>
    //     <h1 className='text-2xl font-bold py-2'>Create account</h1>
    //     <p className='py-2'>
    //       User Sign in{' '}
    //       <Link to='/' className='underline'>
    //         Sign in.
    //       </Link>
    //     </p>
    //   </div>
    //   <form onSubmit={handleSubmit}>
    //     <div className='flex flex-col py-2'>
    //       <label className='py-2 font-medium'>Email Address</label>
    //       <input
    //         onChange={(e) => setEmail(e.target.value)}
    //         className='border p-3'
    //         type='email'
    //       />
    //     </div>
    //     <div className='flex flex-col py-2'>
    //       <label className='py-2 font-medium'>Password</label>
    //       <input
    //         onChange={(e) => setPassword(e.target.value)}
    //         className='border p-3'
    //         type='password'
    //       />
    //     </div>
    //     <button className='border border-blue-500 bg-blue-600 hover:bg-blue-500 w-full p-4 my-2 text-white'>
    //       Sign Up
    //     </button>
    //   </form>
    // </div>
    <div class="container">
      <div class="row justify-content-center">
     <div class="col-lg-7">
    <div class="card shadow-lg border-0 rounded-lg mt-5">
    <div class="card-header"><h3 class="text-center font-weight-light my-4">Create Account</h3></div>
    <div class="card-body">

    <form onSubmit={handleSubmit}>
    <div class="form-floating mb-3">
    <input onChange={(e) => setEmail(e.target.value)} class="form-control" id="inputEmail" type="email" placeholder="name@example.com" />
     <label for="inputEmail">Email address</label>
       </div>
         <div class="row mb-3">
    <div class="col-md-6">
      <div class="form-floating mb-3 mb-md-0">
        <input onChange={(e) => setPassword(e.target.value)} class="form-control" id="inputPassword" type="password" placeholder="Create a password" />
       <label for="inputPassword">Password</label>
           </div>
           </div>
        <div class="col-md-6">
          <div class="form-floating mb-3 mb-md-0">
           <input onChange={(e) => setPasswordtwo(e.target.value)}class="form-control" id="inputPasswordConfirm" type="password" placeholder="Confirm password" />
          <label for="inputPasswordConfirm">Confirm Password</label>
           </div>
           </div>
            </div>
             <div class="mt-4 mb-0">
                 <div class="d-grid"><button disabled={isInvalid} type="submit" href="/home">Create Account</button></div>
                </div>
              </form>
                 </div>
              <div class="card-footer text-center py-3">
              <div class="small"><a href="/">Have an account? Login</a></div>
            </div>
           </div>
          </div>
         </div>
    </div>
  );
};

export default Signup;