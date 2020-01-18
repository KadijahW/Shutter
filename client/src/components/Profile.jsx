import React from "react"
import { Route, Link, Switch } from "react-router-dom";
import axios from "axios"
import PictureDisplay from "./PictureDisplay";
import './CSS/Profile.css';


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
            hideNewImage: true,
            comments: []
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
        this.getHashtags();
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
            const { username } = this.state
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
        const { username, imageURL, caption } = this.state;
        console.log(username, imageURL, caption)
        try {
            console.log("hi try")
            const res = await axios.post('http://localhost:3001/images/upload', { poster_name: username, image_url: imageURL, caption: caption })
            console.log(res.data.body)
        } catch (err) {
            console.log(err)
        }
    }

    getComments = async () => {
        let obj = {}
        try {
            const res = await axios.get(`http://localhost:3001/comments`);
            let comments = res.data.body;
            for (let i of comments) {
                obj[i.comment_id] = i;
            }
            this.setState({
                comments: obj
            })
            // console.log("Commentssssss", this.state.comments)

        } catch (error) {
            console.log(error)
        }
    }



    handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        console.log(data)
        data.append("image", this.state.imageFile)
        console.log(data)
        try {
            const res = await axios.post('http://localhost:3001/upload', data)
            console.log(res.data)
            this.setState({
                imageURL: res.data.imageUrl,
                message: "Image uploaded!"
            })

            this.imgToDatabase();
        } catch (err) {
            console.error(err)
        }
    }

    changeProfileImage = async (e) => {
        const { username, imageURL } = this.state;
        try {
            const res = await axios.patch('http://localhost:3001/images', { username: username, image_url: imageURL })
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
        try {
            const res = await axios.post('http://localhost:3001/upload', data)
            console.log(res.data, "THIS")
            this.setState({
                imageURL: res.data.imageUrl,
                profileImage: res.data.imageUrl,
                // message: "Image uploaded!"
            })

            this.changeProfileImage();
        } catch (err) {
            console.error(err)
        }
    }

    componentDidMount() {
        this.getAllUserPictures();
        this.getComments();
        this.getProfileImage();
    }
    componentDidUpdate() {
        console.log('updated')
        // this.changeProfileImage()
    }

    getHashtags = async () => {
        const { hashtags, pictures } = this.state
        let obj = {};
        // console.log(pictures)
        for (let i = 0; i < pictures.length; i++) {
            let response = await axios.get(`http://localhost:3001/hashtags/image/${pictures[i].id}`);
            let results = response.data.body
            for (let tag of results) {
                obj[tag.hashtag] = pictures[i].id
            }

            console.log(obj, "HASHTAGS results")

        }
        this.setState({
            hashtags: obj
        })
        // console.log(hashtags)
    }


    render() {
        return (
            <div className="profileContainer">
                {/* <ProfilePicture
                    username = {this.state.username}
                    handleSubmitProfile = {this.handleSubmitProfile}
                    handleFileInput = {this.handleFileInput}
                /> */}
                <div className="header">
                    <div className="profileHeader">
                        <img
                            src={this.state.profileImage}
                            width='300px'
                            height='300px'
                        />

                    </div>

                    <div className="welcomeHeader">
                    <h1 className="userName">Welcome {this.props.userName}</h1>
                    <form id="newImageForm" onSubmit={this.handleSubmitProfile}>
                        <input type="file" onChange={this.handleFileInput} required />
                        <input type="submit" value="Upload" />
                    </form>
                    </div>

                    <p>{this.state.message}</p>
                    {/* <button onClick={this.getAllUserPictures}
                    >get picture</button> */}
                </div>
                <form className="picUpload" onSubmit={this.handleSubmit}>
                    <input type="file" onChange={this.handleFileInput} required />
                    <input type="text" placeholder="caption" onChange={this.handleCaption}></input>
                    <input type="text" placeholder="tags" onChange={this.handleTags}></input>
                    <input type="submit" value="Upload" />
                </form>
                <div className="imageGallery">
                    <PictureDisplay pictures={this.state.pictures}
                        hashtags={this.state.hashtags}
                        username={this.state.username}
                        comments={this.state.comments}
                    />
                </div>
            </div>
        )

    }

}

export default Profile;