import React from 'react'
import {Link} from 'react-router-dom'
import '../css/Navbar.css'

function NavBar() {
    return (
       <nav className={"navbar"}>
           <div className="navbar-brand">
               <Link to="/">Movie App</Link>
           </div>
           <div className="navbar-links">
               <Link to="/" className="nav-link">Home</Link>
               <Link to="/favourite" className="nav-link">Favourite</Link>
           </div>
       </nav>
    )
}

export default NavBar;