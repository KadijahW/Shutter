import React from "react"
import {Route} from 'react-router-dom'
import './CSS/Signup.css';
import axios from "axios";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class SignUp extends React.Component{
    constructor(){
        super();
        this.state = {
            username: "",
            email: ""
        }
    }
    
    handleFormSubmit = async (e) =>{
        let {username, email} = this.state
        e.preventDefault()
        console.log("clicked")

        try{

            let url = `http://localhost:3001/user/post`
            let res = await axios.post(url, {username: username, email: email})
            console.log(res)
            
            this.props.history.push("/")
            this.props.signUp(this.state.username, this.state.email)


        }catch(err){
            console.log(err + "you fucked up")

        }

    }

    handleEmailChange = (e) =>{
        console.log("email changed",e.target.value)
        this.setState({
            email: e.target.value
        })
    }

    handleUserNameChange = (e) =>{
        console.log("userName changed",e.target.value)
        this.setState({
            username: e.target.value
        })
    }

    
    render(){
        let {email, username} = this.state

        return (
           
            <div className= "createAcc">
            
                <h1>Create Account </h1>
                <br/>

                <form onSubmit = {this.handleFormSubmit}>
                    
                <i  className="fas fa-user icon"></i>
                <label htmlFor = "name "> </label>
                    <input className="signupForm"
                    id = "name" 
                    type = "text"
                    // value = {name}
                    placeholder = "Enter Name" 
                    required = "required"/>
                    <br/>

                    <i  className="fas fa-envelope icon"></i>
                    <label htmlFor = "email">  </label>
                    <input  className="signupForm"
                    id = "email" 
                    type = "email"
                    value = {email}
                    onChange = {this.handleEmailChange} 
                    placeholder =  "Enter Email" 
                    required = "required"/>
                    <br/> 

                    <i  className="fas fa-check icon" ></i>
                    <label htmlFor = "username"> </label>
                    <input  className="signupForm"
                    id = "username" 
                    type = "text" 
                    value = {username}
                    onChange = {this.handleUserNameChange}
                    placeholder = "Enter Username" 
                    required = "required"/>
                    <br/>
                    <button id="createButton"> Create Account </button>
                </form>
            </div>
        )

    }
    
    
}

export default SignUp