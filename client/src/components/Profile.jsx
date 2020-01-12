import React from "react"
import {Route, Link, Switch} from "react-router-dom";
import axios from "axios"
import PictureDisplay from "./PictureDisplay";

class Profile extends React.Component {
    constructor(props) {
        super()
        this.state = {
            username: props.userName,
            pictures: [],
            hashtags: [],
            imageURL: "",
            imageFile: null,
            message: "",
            caption: "",
            tags: "",
            profileImage: "",
            hideNewImage: true
        }
    }
    getAllUserPictures = async () => {
        const { username } = this.state
        console.log(username)
        let pictures = await axios.get(`http://localhost:3001/images/users/${username}`);
        console.log(pictures.data.body)
        this.setState({
            pictures: pictures.data.body
        })
    }
    hashtag = async (image_id) => {
        let newArr = []
        let hashtags = await axios.get(`http://localhost:3001/hashtags/image/${image_id}`);
        newArr = [hashtags.data.body]
        newArr.map((hashtag) => {
            // console.log(hashtag)
            newArr = [...newArr, hashtag]
        })
        this.setState({
            hashtags: newArr
        })
        
    }
    handleFileInput = (event) => {
        console.log("file changed")
        console.dir(event.target)
        this.setState({
          imageFile: event.target.files[0]
        })
      }
    
    getProfileImage = async () => {
        try {
            const {username} = this.state
            console.log("profile pic function")
            console.log(username)

            const res = await axios.get(`http://localhost:3001/images/profileImage/${username}`)
            console.log(res.data.body)
            console.log("hi")
            this.setState({
                profileImage: res.data.body[0].profileimage
            })
        } catch (error) {
            console.log(error)
        }

    }

    

  

    handleCaption = (e) => {
        this.setState({
            caption: e.target.value 
        })
    }

    handleTags = (e) => {
        this.setState({
            tags: e.target.value 
        })
    }

    imgToDatabase = async () => {
        console.log("hi")
        const {username, imageURL, caption} = this.state; 
        console.log(username, imageURL, caption)
        try {
            console.log("hi try")
            const res = await axios.post('http://localhost:3001/images/upload', {poster_name:username, image_url: imageURL, caption: caption})
            console.log(res.data.body)
        }catch (err) {
            console.log(err)
        }
    }

    

    handleSubmit = async (e) => {
        e.preventDefault();
    
        const data = new FormData();
        console.log(data)
        data.append("image", this.state.imageFile)
        console.log(data)
        try{ 
          const res = await axios.post('http://localhost:3001/upload', data)
          console.log(res.data)
          this.setState({
            imageURL: res.data.imageUrl,
            message: "Image uploaded!"
          })

          this.imgToDatabase();
        }catch (err){ 
          console.error(err)
        }
      }

      profileImageForm = async (e) => {
          e.preventDefault();
          

          this.setState({
              hideNewImage: false
          })

      }

      changeProfileImage = async (e) => {
        const {username, imageURL} = this.state;
        try {
            const res = await axios.patch('http://localhost:3001/images', {username: username, image_url: imageURL})
        } catch (error) {
            console.log(error)
        }
    }

      handleSubmitProfile = async (e) => {
        e.preventDefault();
    
        const data = new FormData();
        console.log(data)
        data.append("image", this.state.imageFile)
        console.log(data)
        try{ 
          const res = await axios.post('http://localhost:3001/upload', data)
          console.log(res.data)
          this.setState({
            imageURL: res.data.imageUrl,
            message: "Image uploaded!"
          })

          this.changeProfileImage();
        }catch (err){ 
          console.error(err)
        }
      }
       

    render() {
        return (
            <div>
                <img src={this.state.profileImage} alt =""></img>
                <button onClick={this.profileImageForm}>Change Image</button>
                <form id="newImageForm" onSubmit={this.handleSubmitProfile}>
                    <input type="file" onChange={this.handleFileInput} required/>
                    <input type="submit" value="Upload"/>
                </form>
                <button onClick={this.getProfileImage}>GetProfileImage</button>
                <h1>Welcome {this.props.userName}</h1>
                <form onSubmit={this.handleSubmit}>
                    <input type="file" onChange={this.handleFileInput} required/>
                    <input type="text" placeholder ="caption" onChange={this.handleCaption}></input>
                    <input type="text" placeholder="tags" onChange={this.handleTags}></input>
                    <input type="submit" value="Upload"/>
                </form>
                <p>{this.state.message}</p>
                <button onClick={this.getAllUserPictures}
                >get picture</button>
                <PictureDisplay pictures={this.state.pictures} 
                // getHashtags = {this.hashtag}
                />
            </div>
        )

    }

}

export default Profile;