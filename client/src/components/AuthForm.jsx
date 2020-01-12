import React from 'react'
import {Link,Route,Switch} from 'react-router-dom'
import HomePage from './HomePage'
import './CSS/AuthForm.css';



class AuthForm extends React.Component {
    
    
    handleSubmit = (e) =>{
        console.log("form submitted")
        e.preventDefault()
        this.props.logIn()
    }

    render(){
        return(
        <div className = "container">

              {/* <img id="camera" src="https://premiumbpthemes.com/images/clipart-camera-square-8.png" alt="camera"/> */}
        
        <div className = "AppTwo">
            </div>

            <div className="form">

<div className="information">
                <div className="signInicon">
                <i id="lock" class="fas fa-user-lock"></i>
                <h1> Sign In </h1> 
                </div>
            
            <form id="login" onSubmit = {this.handleSubmit}>
            <input className= "login" type ="text" placeholder = "Enter Email" required ></input>
            <br/>
            <button className="loginBtn">Login</button>
            <br/>
             <button className="signBtn">
            <Link to = "/SignUp">Sign Up</Link>
            </button>
            </form>
            </div>

            </div>
            </div>
        )
    }
}



export default AuthForm