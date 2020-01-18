import React from 'react';
import Interactions from './Interactions';
import axios from 'axios';

class Picture extends React.Component {
    constructor(props) {
        super()
        this.state = {
            username: props.username,
            poster_name: props.poster_name,
            caption: props.caption,
            hashtag: props.hashtag,
            id: props.id,
            url: props.url,
            alt: props.alt,
            height: props.height,
            width: props.width,
            comment: ""
        }
    }
    getSinglePicture = async () => {
        const {id} = this.state;
        try {
            const res = await axios.get(`http://localhost:3001/images/${id}`)
            console.log(res.data.payload[0])

        } catch (error) {
            console.log(error)
        }
    }
    
    handleComment =(e) => {
        console.log("comment", e.target.value)
        this.setState({
            comment: e.target.value
        })
    }

    formSubmit = async (e) =>{
        let {id,username,comment} = this.state
        e.preventDefault()

        try{

        let url = `http://localhost:3001/comments/`
        let res = await axios.post(url,{image_id: id, commentors_name: username, comment: comment})
        console.log("button hit", res.data)
        this.props.getComments()

        }catch(err){
            console.log(err + "error")
        }
    }

    // componentDidMount() {
        
    // }


    
    render() {

        const { username, poster_name, caption, hashtag, id, url, alt, height,comment } = this.state
        console.log("picture", hashtag)
        console.log("stats",id,username)

        return (
            <div id = 'pictures'>
                <img onClick={this.getSinglePicture}
                    src={url}
                    alt={alt}
                    width={`400px`}
                    height={`${height}px`}//'300px'
                /><br/>
                <form onSubmit = {this.formSubmit}>
                    <input id = "comment-box" 
                    type = "text" 
                    placeholder = "Comment Here"
                    value = {comment}
                    onChange = {this.handleComment}/>
                    <button type="submit">Post</button>
                </form>
                    

                <Interactions username={username} poster_name={poster_name} caption={caption} id={id} hashtag={hashtag} comments={this.props.comments} />
            </div>

        )
    }
}
export default Picture;