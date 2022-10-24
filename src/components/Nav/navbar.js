import React from 'react';
import {NavLink} from 'react-router-dom';
import './navbar.css';

const navbar = props =>(
<header className= "navbar">
<div className="navbarLogo">
<h1 className='text-center text-3xl font-bold text-white bg-dark'>
        Flower POS
      </h1>

</div>
<nav className ="navbarList">

<ul id="navlinks">
<li><NavLink to="/home">Home</NavLink> </li>
<li><NavLink to="/account">Account</NavLink> </li>
<li><NavLink to="/order">New Order</NavLink> </li>
<li><NavLink to="/vieworders">View Orders</NavLink> </li>
<li><NavLink to="/viewproduct">Products</NavLink> </li>
<li><NavLink to="/createrecipe">Create Recipes</NavLink> </li>


</ul>
</nav>
</header>

);

export default navbar;