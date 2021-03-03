import React from "react";
import {Link } from "react-router-dom";

const Nav =()=>{
    return(<>
    <nav style={{backgroundColor:"#00b0ff"}}>
<div class="nav-wrapper">
  <ul id="nav-mobile" class="left hide-on-med-and-down">
        <li><Link to="/">Multiple Certificate</Link></li>
        <li><Link to="/page3">One Certificate</Link></li>
  </ul>
  <a href="#" class="brand-logo center">Oyester</a>
  <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li><Link to="/page2">Next</Link></li>
  </ul>
  
</div>
</nav>
    </>);


}

export default Nav;