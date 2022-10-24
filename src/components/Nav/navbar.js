import React from 'react';
import {NavLink} from 'react-router-dom';
import './navbar.css';

const navbar = props =>(
<header className= "navbar">
<div className="navbarLogo">

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