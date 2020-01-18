import React from "react"
import Profile from "./Profile"
import { Route, Link, Switch } from "react-router-dom";
import axios from "axios"
import PictureDisplay from "./PictureDisplay";
import './CSS/HomePage.css';
import Search from './Search';


class HomePage extends React.Component {
    constructor(props) {
        super()
        this.state = {
            username: props.userName,
            pictures: [],
            hashtags: [],
            imageFile: null,
            uploadedCaption: '',
            uploadedHashtag: '',
            message: '',
            checkbox: false,
            alt: '',
            search: '',
            searched: '',
            id: 0,
            likes: ''

        }
    }


    getAllPictures = async () => {
        const { pictures, hashtags } = this.state
        let arr = [];
        let newArr = [];
        let response = await axios.get(`http://localhost:3001/images/`);

        // console.log('data', response.data.body)

        arr = response.data.body
        console.log(arr)
        arr.map((picture) => {
            this.getHashtags(picture.id)
            // this.getLikes(picture.id)
            newArr = [...newArr, picture]

        })
        // console.log(newArr)
        this.setState({
            pictures: newArr
        })

        this.getHashtags()
        // this.getLikes()
        // PFiorentino@project.com
    }
    getHashtags = async () => {
        const { hashtags, pictures } = this.state
        let arr = [];
        // console.log(pictures)
        for (let i = 0; i < pictures.length; i++) {
            let response = await axios.get(`http://localhost:3001/hashtags/image/${pictures[i].id}`);
            let results = response.data.body
            // console.log(results)
            arr.push(results)
        }
        this.setState({
            hashtags: arr
        })
        // console.log(hashtags)
    }

    handleFileInput = (event) => {
        const { pictures, imageFile } = this.state
        this.setState({
            imageFile: event.target.files[0]
        })
    }
    imgToDatabase = async (id) => {
        const { username, imageURL, uploadedCaption, checkbox, alt } = this.state;
        console.log(username, imageURL, uploadedCaption, checkbox)
        let altText = ''
        if (!checkbox) {
            altText = `${username} uploaded a photo`
        } else {
            altText = alt
        }
        try {
            console.log("hi try")
            const res = await axios.post('http://localhost:3001/images/upload', { poster_name: username, image_url: imageURL, caption: uploadedCaption, alt: altText })
            // console.log(res.data.body)
            this.postHashtag(id);
            this.getAllPictures()
        } catch (err) {
            console.log(err)
        }
    }
    handleSubmit = async (event) => {
        event.preventDefault();
        const { id } = this.state
        const data = new FormData();
        console.log(data)
        data.append("image", this.state.imageFile)
        console.log(data)
        try {
            const res = await axios.post('http://localhost:3001/upload', data)
            // console.log(res.data)
            this.setState({
                imageURL: res.data.imageUrl,
                message: "Image uploaded!"
            })

            this.imgToDatabase(id);

        } catch (err) {
            console.error(err)
        }
        this.setState({
            id: parseInt(id) + 1
        })


    }
    postHashtag = async (id) => {
        const { uploadedHashtag } = this.state
        try {
            const res = await axios.post('http://localhost:3001/hashtags/upload', { hashtag: uploadedHashtag, image_id: id })
            this.getAllPictures()
        } catch (err) {
            console.log(err)
        }
    }
    handleCaptionChange = (event) => {
        this.setState({
            uploadedCaption: event.target.value
        })
    }
    handleHashtagChange = (event) => {
        this.setState({
            uploadedHashtag: event.target.value
        })
    }
    selectAlt = (event) => {
        const { checkbox } = this.state
        this.setState({
            checkbox: !checkbox
        })
    }

    componentDidMount() {
        // console.log('mounted')
        this.countImage()
        this.getAllPictures()

    }
    componentDidUpdate() {
        // console.log('updated')
    }
    handleAltChange = (event) => {
        this.setState({
            alt: event.target.value
        })
    }
    handleSearchChange = (event) => {
        this.setState({
            search: event.target.value
        })
    }
    countImage = async () => {
        try {
            const res = await axios.get('http://localhost:3001/images/count')
            this.setState({
                id: res.data.body[0].id + 1
            })
        } catch (err) {
            console.log(err)
        }
    }
    handleSearchChange = (event) => {
        this.setState({
            search: event.target.value
        })

    }
    handleSearchSubmit = (event) => {
        event.preventDefault()
        const { search, searched } = this.state;
        this.setState({
            searched: search
        })

    }
    render() {
        const { checkbox, username, hashtags, pictures, searched } = this.state
        console.log(searched)
        return (
            <div>
                {/* <Link to="/profile">Profile</Link> */}

                <form onSubmit={this.handleSearchSubmit}>
                    <label htmlFor='search'> Search
                    <input name='search' type='text' placeholder='Search' onChange={this.handleSearchChange} />
                    </label>
                            <Link to={`/search/`}><input type='submit' value='Search' /></Link>
                    
                </form>

                <h1>Welcome {username}</h1>
                <h3>{this.props.email}</h3>
                <form onSubmit={this.handleSubmit}>
                    <input type='file' onChange={this.handleFileInput} required />
                    {/* <br></br> */}
                    <label htmlFor='caption'>Caption <input name='caption' type='text' placeholder='Enter a caption' onChange={this.handleCaptionChange} /> </label>
                    {/* <br></br> */}
                    <label htmlFor='hashtag'>Hashtag <input name='hashtag' type='text' placeholder='Add hashtags' onChange={this.handleHashtagChange} /> </label>
                    <label htmlFor='alt'> Add alternate text<input name='alt' type='checkbox' value='checked' onChange={this.selectAlt} /></label>
                    {checkbox ?
                        <input name='altText' type='text' placeholder='Add Alt text' onChange={this.handleAltChange} required /> :
                        null}
                    {/* <br></br> */}
                    <input type='submit' value='Upload' />
                </form>
                {/* <button onClick={this.getAllPictures}>get picture</button> */}
                <div id='homepage'>
                    <PictureDisplay pictures={pictures}
                        hashtags={hashtags}
                        username={username}
                    />
                </div>

            </div>
        )

    }

}

export default HomePage