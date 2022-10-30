import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';


const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { signIn } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('')
    try {
      await signIn(email, password)
      navigate('/home')
    } catch (e) {
      setError(e.message)
      console.log(e.message)
    }
  };

  return (
   
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-5">
                            <div className="card shadow-lg border-0 rounded-lg mt-5">
                                <div className="card-header"><h3 className="text-center font-weight-light my-4">Login</h3></div>
                                <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                        <div className="form-floating mb-3">
                                        <input onChange={(e) => setEmail(e.target.value)} className="form-control" id="inputEmail" type="email" placeholder="name@example.com" />
                                            <label htmlFor="inputEmail">Email Address</label>
                                        </div>
                                        <div className="form-floating mb-3">
                                        <input onChange={(e) => setPassword(e.target.value)} className="form-control" id="inputPassword" type="password" placeholder="Password" />
                                            <label htmlFor="inputPassword">Password</label>
                                        </div>
                                        
                                        <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                                            <a className="small" href="password.html">Forgot Password?</a>
                                            <a className="btn btn-primary" href="/account">Login</a>
                                        </div>
                                    </form>
                                </div>
                                <div className="card-footer text-center py-3">
                                <div className="small"><a href="/signup">Need an account? Sign up!</a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    
  );
};

export default Signin;