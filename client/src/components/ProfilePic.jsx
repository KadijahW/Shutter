import React from 'react';
import Interactions from './Interactions';
import axios from 'axios';

class ProfilePicture extends React.Component {
    constructor(props) {
        super()
        this.state = {
            username: props.username,
            profileImage: ""
        }
    }
    getProfileImage = async () => {
        try {
            const {username} = this.state
            console.log("profile pic function")
            console.log(username)

            const res = await axios.get(`http://localhost:3001/images/profileImage/${username}`)
            this.setState({
                profileImage: res.data.body[0].profileimage
            })
        } catch (error) {
            console.log(error)
        }

    }

    render() {
        const { profileImage } = this.state
        // console.log("picture", hashtag)
        return (
            <>
                <img 
                    src={profileImage}
                    width='300px'
                    height='300px'
                />
            </>
        )
    }
}
export default ProfilePicture;