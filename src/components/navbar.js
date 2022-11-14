import React, {  useState } from "react";
import {NavLink, useNavigate} from 'react-router-dom';
import './navbar.css';
import logo from '../assets/logo.png'
import { Navbar, Nav, NavDropdown, Form, Button, ButtonGroup } from 'react-bootstrap'
import { connect } from 'react-redux'
import NoLoggedInView from '../components/NoLoggedInView';
import { UserAuth} from '../context/AuthContext';


const NavBar = ({ }) => {
 
      const { user, logout } = UserAuth();
      const navigate = useNavigate();
      const handleLogout = async () => {
            try {
              await logout();
              navigate('/account');
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
                              Welcome to Flower POS!
                        </h1>
                  </div>
                  <nav className="navbarList">
                        <ul id="navlinks">
                              <li><NavLink to="/account">Home</NavLink> </li>
                              <li><NavLink to="/order">New Order</NavLink> </li>
                              <li><NavLink to="/vieworders">View Orders</NavLink> </li>
                              <li><NavLink to="/viewproduct">Products</NavLink> </li>
                              <li><Form inline>
                        {authButton()}
                  </Form>
                  </li>
                              {/* <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="fas fa-user fa-fw"></i></a>
                    <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                        <li> <NavLink class="dropdown-item" onClick={authButton()}>Logout</NavLink></li>
                    </ul>
                              </li> */}
                        </ul> 
                  </nav>
            </header></>
          
      )
  }
  
  function mapStateToProps(state) {
      return { user: state.user }
    }
  
  export default connect(mapStateToProps, {} )(NavBar)

