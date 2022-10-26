import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import Footer from './footer';

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
   
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-lg-5">
                            <div class="card shadow-lg border-0 rounded-lg mt-5">
                                <div class="card-header"><h3 class="text-center font-weight-light my-4">Login</h3></div>
                                <div class="card-body">
                                <form onSubmit={handleSubmit}>
                                        <div class="form-floating mb-3">
                                        <input onChange={(e) => setEmail(e.target.value)} class="form-control" id="inputEmail" type="email" placeholder="name@example.com" />
                                            <label for="inputEmail">Email Address</label>
                                        </div>
                                        <div class="form-floating mb-3">
                                        <input onChange={(e) => setPassword(e.target.value)} class="form-control" id="inputPassword" type="password" placeholder="Password" />
                                            <label for="inputPassword">Password</label>
                                        </div>
                                        
                                        <div class="d-flex align-items-center justify-content-between mt-4 mb-0">
                                            <a class="small" href="password.html">Forgot Password?</a>
                                            <a class="btn btn-primary" href="/account">Login</a>
                                        </div>
                                    </form>
                                </div>
                                <div class="card-footer text-center py-3">
                                <div class="small"><a href="/signup">Need an account? Sign up!</a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    
  );
};

export default Signin;