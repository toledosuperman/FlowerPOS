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
    // <div className='max-w-[700px] mx-auto my-16 p-4'>
    //   <div>
    //     <h1 className='text-2xl font-bold py-2'>Sign in to your account</h1>
    //     <p className='py-2'>
    //       Create Account{' '}
    //       <Link to='/signup' className='underline'>
    //         Sign up.
    //       </Link>
    //     </p>
    //   </div>
      // <form onSubmit={handleSubmit}>
      //   <div className='flex flex-col py-2'>
      //     <label className='py-2 font-medium'>Email Address</label>
      //     <input onChange={(e) => setEmail(e.target.value)} className='border p-3' type='email' />
      //   </div>
      //   <div className='flex flex-col py-2'>
      //     <label className='py-2 font-medium'>Password</label>
      //     <input onChange={(e) => setPassword(e.target.value)} className='border p-3' type='password' />
      //   </div>
      //   <button className='border border-blue-500 bg-blue-600 hover:bg-blue-500 w-full p-4 my-2 text-white'>
      //     Sign In
      //   </button>
      // </form>
    //</div>
    <div class="container">
    <div class="row justify-content-center">
        <div class="col-lg-5">
            <div class="card shadow-lg border-0 rounded-lg mt-5">
                <div class="card-header"><h3 class="text-center font-weight-light my-4">Login</h3></div>
                <div class="card-body">
                <form onSubmit={handleSubmit}>
                        <div class="form-floating mb-3">
                            <input onChange={(e) => setEmail(e.target.value)} class="form-control" id="inputEmail" type="email" placeholder="name@example.com" />
                            <label for="inputEmail">Email address</label>
                        </div>
                        <div class="form-floating mb-3">
                            <input onChange={(e) => setPassword(e.target.value)} class="form-control" id="inputPassword" type="password" placeholder="Password" />
                            <label for="inputPassword">Password</label>
                        </div>
                        <div class="form-check mb-3">
                            <input class="form-check-input" id="inputRememberPassword" type="checkbox" value="" />
                            <label class="form-check-label" for="inputRememberPassword">Remember Password</label>
                        </div>
                        <div class="d-flex align-items-center justify-content-between mt-4 mb-0">
                            <a class="small" href="">Forgot Password?</a>
                            <a class="btn btn-primary" href="/home">Login</a>
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