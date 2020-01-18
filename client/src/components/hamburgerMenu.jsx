import React from "react"
import{Link,Route,Switch,Redirect} from 'react-router-dom'
import "./CSS/hamburgerMenu.css"
import Dropdown from "./CSS/hamburgerMenu.js"
import Profile from './Profile';
const Menu = (props) =>{
    return(
        <div className = "dropdown">
            
            <button className = "dropbtn"
            onClick = {Dropdown.dropdown}>&#9776;</button>
            <div className = "dropdown-content" id = "myDropdown">
                <button id = "home"><Link to ="/">Shutter</Link></button>
                <button id = "profile"><Link to ="/profile">Profile</Link></button>
                <button id = "search"><Link to ="/search">Search</Link></button>
                <button id = "signout" onClick = {props.signOut}>Sign Out</button>
            </div>
        </div>
        
    )
}
            

export default Menu