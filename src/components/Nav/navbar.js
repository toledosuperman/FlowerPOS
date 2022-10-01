import React from 'react';
import {NavLink} from 'react-router-dom';

const navbar = props =>(
<header>
<div className="navbar_logo">
<h1> Go To</h1>
</div>
<nav className ="navbar_list">
<ul>
<li><NavLink to="/account">Account</NavLink> </li>
</ul>
</nav>
</header>

);

export default navbar;