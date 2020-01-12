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
            alt: props.alt
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
    render() {
        const { username, poster_name, caption, hashtag, id, url, alt } = this.state
        return (
            <>
                <img onClick={this.getSinglePicture}
                    src={url}
                    alt={alt}
                    width='300px'
                    height='300px'
                />
                <Interactions username={username} poster_name={poster_name} caption={caption} hashtag={hashtag} id={id} />
            </>
        )
    }
}
export default Picture;