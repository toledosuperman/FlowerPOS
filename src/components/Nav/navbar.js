import React from 'react';
import {NavLink} from 'react-router-dom';
import './navbar.css';

const navbar = props =>(
<header className= "navbar">
<div className="navbarLogo">
<h1>Go To</h1>
</div>
<nav className ="navbarList">
<ul>
<li><NavLink to="/index">Home</NavLink> </li>
<li><NavLink to="/account">Account</NavLink> </li>

</ul>
</nav>
</header>

);

export default navbar;