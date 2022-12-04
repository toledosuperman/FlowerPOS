import React, { useState , useEffect} from 'react';
import {  Link, useNavigate } from 'react-router-dom';
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "../components/Login.css";
import logo from '../assets/logo.png'
import Footer from './footer';

const Signin = () => {
  //react state constants
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  
//use effect to redirect to account page
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/account");
  }, [user, loading, navigate],);

  return (
  <React.Fragment>
    {/* signin Form */}
    <div className="login" >
    
      <div className="login__container">
      <div className="logo-image">
    <img src={logo} className="img-fluid" alt="" />
</div>
<div className="navbarLogo">
<h1 className='text-left text-3xl font-bold'>
     Flower POS
</h1>
</div>
        <input
          type="text"
          className="login__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="login__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          className="login__btn"
          onClick={() => logInWithEmailAndPassword(email, password)}
        >
          Login
        </button>
        <button className="login__btn login__google" onClick={signInWithGoogle}>
          Login with Google
        </button>
        <div>
          <Link to="/reset">Forgot Password</Link>
        </div>
        <div>
          Don't have an account? <Link to="/Signup">Register</Link> now.
        </div>
      </div>
    </div>
     <Footer />
     </React.Fragment>
  );
}


export default Signin;