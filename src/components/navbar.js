import React from "react";
import {NavLink} from 'react-router-dom';
import './navbar.css';
import logo from '../assets/logo.png'
import {  Form} from 'react-bootstrap'
import { connect } from 'react-redux'
import { UserAuth} from '../context/AuthContext';


const NavBar = (a={ }) => {
 
      const { user, logout } = UserAuth();
      
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
              
            return <NavLink onClick={handleLogout}>Logout</NavLink>
          }
      }
  
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
                              <li><NavLink to="/vieworders">View Orders</NavLink> </li>
                              <li><NavLink to="/viewproduct">Products</NavLink> </li>
                              <li><NavLink to="/createrecipe">Create Recipes</NavLink> </li>
                              <li>
                {authButton()}
            
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

