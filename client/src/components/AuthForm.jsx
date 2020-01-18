import React from 'react'
import { Link, Route, Switch } from 'react-router-dom'
// import HomePage from './HomePage'
import axios from "axios"
import './CSS/AuthForm.css';



class AuthForm extends React.Component {

    constructor() {
        super()
        this.state = {
            email: "",
            userName: "",
            message: ""

        }
    }


    handleSubmit = async (e) => {
        let { email } = this.state
        console.log("form submitted")
        e.preventDefault()
        try {
            let res = await axios.get(`http://localhost:3001/user/${email}`)
            console.log(res.data.body.user)
            let userEmail = res.data.body.user.email
            let userUsername = res.data.body.user.username
            console.log(userEmail, userUsername)

            if (userEmail && userUsername) {
                console.log("progress")
                this.props.logIn(userEmail, userUsername)
            }
        } catch (err) {
            this.props.history.push("/SignUp")
            // this.setState({
            //     message: "User Does not exists"
            // })
        }



        //this.props.logIn()
    }

    handleEmail = (e) => {
        console.log(e.target.value)
        this.setState({
            email: e.target.value
        })
    }

    render() {
        let { message } = this.state

        return (
            <div className="container">

                {/* <img id="camera" src="https://premiumbpthemes.com/images/clipart-camera-square-8.png" alt="camera"/> */}

                <div className="AppTwo">
                </div>

                <div className="formContainer">
                    <div className="form">
                        <div className="information">
                            <div className="signInicon">
                                <i id="lock" className="fas fa-user-lock"></i>
                                <h1> Sign In </h1>
                            </div>

                            <form id="login" onSubmit={this.handleSubmit}>
                                <input className="login" type="text" placeholder="Enter Email" required onChange={this.handleEmail}></input>
                                <br />
                                <button className="loginBtn">Login</button>
                                <br />
                                <Link to="/SignUp"><button className="signBtn">Sign Up</button></Link>
                            </form>
                        </div>

                        <p>{message}</p>
                    </div>
                </div>
            </div>
        )
    }
}



export default AuthForm