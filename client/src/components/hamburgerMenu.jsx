import React from "react"
import "./CSS/hamburgerMenu.css"
import Dropdown from "./CSS/hamburgerMenu.js"

const Menu = (props) =>{
    console.log("hamburger menu jsx triggered")
    return(
        <div className = "dropdown">
            
            <button className = "dropbtn"
            onClick = {Dropdown.dropdown}>&#9776;</button>
            <div className = "dropdown-content" id = "myDropdown">
                <button id = "signout" onClick = {props.signOut}>Sign Out</button>
            </div>
        </div>
        
    )
}
            

export default Menu