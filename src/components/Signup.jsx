import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';


const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordtwo, setPasswordtwo]= useState('');
  const [ setError] = useState('');
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
   
    <div className="container">
      <div className="row justify-content-center">
     <div className="col-lg-7">
    <div className="card shadow-lg border-0 rounded-lg mt-5">
    <div className="card-header"><h3 className="text-center font-weight-light my-4">Create Account</h3></div>
    <div className="card-body">

    <form onSubmit={handleSubmit}>
    <div className="form-floating mb-3">
    <input onChange={(e) => setEmail(e.target.value)} className="form-control" id="inputEmail" type="email" placeholder="name@example.com" />
     <label htmlFor="inputEmail">Email Address</label>
       </div>
         <div className="row mb-3">
    <div className="col-md-6">
      <div className="form-floating mb-3 mb-md-0">
        <input onChange={(e) => setPassword(e.target.value)} className="form-control" id="inputPassword" type="password" placeholder="Create a password" />
       <label htmlFor="inputPassword">Password</label>
           </div>
           </div>
        <div className="col-md-6">
          <div className="form-floating mb-3 mb-md-0">
           <input onChange={(e) => setPasswordtwo(e.target.value)}className="form-control" id="inputPasswordConfirm" type="password" placeholder="Confirm password" />
          <label htmlFor="inputPasswordConfirm">Confirm Password</label>
           </div>
           </div>
            </div>
             <div className="mt-4 mb-0">
                 <div className="d-grid"><button disabled={isInvalid} type="submit" href="/home">Create Account</button></div>
                </div>
              </form>
                 </div>
              <div className="card-footer text-center py-3">
              <div className="small"><a href="/">Have an account? Login</a></div>
            </div>
           </div>
          </div>
         </div>
    </div>
  );
};

export default Signup;