import React from 'react';
import {NavLink} from 'react-router-dom';
import './navbar.css';

const navbar = props =>(
<header className= "navbar">
<div className="navbarLogo">

</div>
<nav className ="navbarList">
<ul id="navlinks">
<li><NavLink to="/index">Home</NavLink> </li>
<li><NavLink to="/account">Account</NavLink> </li>
<li><NavLink to="/order">New Order</NavLink> </li>
<li><NavLink to="/vieworders">Pending Orders</NavLink> </li>
<li><NavLink to="/createrecipe">New Recipe</NavLink> </li>

</ul>
</nav>
</header>

);

export default navbar;