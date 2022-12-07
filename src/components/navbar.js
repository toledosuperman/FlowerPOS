import React, { useEffect, useState } from "react";
import {NavLink} from 'react-router-dom';
import './navbar.css';
import logo from '../assets/logo.png'
import {  Form, Button} from 'react-bootstrap'
import { connect } from 'react-redux'
import { UserAuth} from '../context/AuthContext';
import {  db, auth} from "../firebase.js";
import { collection, getDocs, query, where} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from 'react-hot-toast';
//navbar data retrieval, user check
const NavBar = (a={ }) => {
      const [role, setRole] = useState(false);
      const [user, loading] = useAuthState(auth);
      useEffect(() => {
            if (loading) return;
            const fetchUserRole = async () => {
              try {
                const q = query(collection(db, "users"), where("uid", "==", user?.uid));
                const doc = await getDocs(q);
                const data = doc.docs[0].data();
                setRole(data.role);
              } catch (err) {
                console.error(err);
                toast.error("An error occured while fetching user data");
              }
            };
            fetchUserRole();
          }, [user, loading]);
      const {  logout } = UserAuth();
      
      const handleLogout = async () => {
            try {
              await logout();
              
              console.log('You are logged out')
            } catch (e) {
              console.log(e.message);
            }
          };
  
      const authButton = () => {
          if (user !== null) {
              
              return <Button style={{
             fontSize: '17px',
              border: 'none',
              outline: 'none',
              textAlign: 'center',
              background: 'linear-gradient(#e5b518cc, #d36d2a)',
              color: 'white',        
              marginTop: 8,}}  onClick={handleLogout}>Logout</Button>
          }
      }
  //navbar display
      return (
            <><header className="navbar">
                  <a className="navbar-brand" href="/">
                        <div className="logo-image">
                              <img src={logo} className="img-fluid" alt="" />
                        </div>
                  </a>
                  <div className="navbarLogo">
                        <h1 className='text-left text-3xl font-bold'>
                               Flower POS
                        </h1>
                  </div>
                  <nav className="navbarList">
                        <ul id="navlinks">
                              <li><NavLink to="/account">Home</NavLink> </li>
                              <li><NavLink to="/order">New Order</NavLink> </li>
                              <li><NavLink to="/vieworders">View Orders</NavLink> </li> </ul>
                              {role === true &&
                              <ul id="navlinks">
                              <li><NavLink to="/viewproduct">Products</NavLink> </li>
                              <li><NavLink to="/createrecipe">Create Recipes</NavLink> </li>
                              <li><NavLink to="/viewusers">Users</NavLink> </li>
                              <li><NavLink to="/reports">Reports</NavLink> </li></ul> }
                              <ul id="navlinks">
                              <li className="inactive"><Form inline= "true">
                        {authButton()}
                  </Form>
                  </li>
                        </ul> 
                  </nav>
            </header></>
          
      )
  }
  
  function mapStateToProps(state) {
      return { user: state.user }
    }
  
  export default connect(mapStateToProps, {} )(NavBar)