import React from 'react';
import {NavLink} from 'react-router-dom';
import './navbar.css';
import logo from '../assets/logo.png'

const navbar = props =>(
<header className= "navbar">
<a class="navbar-brand" href="/">
      <div class="logo-image">
            <img src= {logo} class="img-fluid"/>
      </div>
</a> 
 
<div className="navbarLogo">



<h1 className='text-left text-3xl font-bold'>
        Welcome to Flower POS!
      </h1>
      
</div>

<nav className ="navbarList">

<ul id="navlinks">

<li><NavLink to="/account">Home</NavLink> </li>
<li><NavLink to="/order">New Order</NavLink> </li>
<li><NavLink to="/vieworders">View Orders</NavLink> </li>
<li><NavLink to="/viewproduct">Products</NavLink> </li>
<li><NavLink to="/createrecipe">Create Recipes</NavLink> </li>
<li><NavLink to="/customers">Customers</NavLink> </li>


</ul>
</nav>
</header>

);

export default navbar;