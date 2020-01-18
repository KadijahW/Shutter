import React from 'react';
import Picture from './Picture';
import Masonry from 'react-masonry-component';
import axios from 'axios';


const masonryOptions = {
    transitionDuration: 0
};
const style = {
    // backgroundColor: 'tomato',
    // alignItems: 'center'
};
const imagesLoadedOptions = { background: '.my-bg-image-el' }

class PictureDisplay extends React.Component {
    constructor(props) {
        super()
        console.log(props, "propssssss")
        this.state = {
            username: props.username,
            hashtags: {},
            comments: {}
        }
    }

    

    getComments = async () => {
        let obj = {}
        // let objArr = [];
        try {    
            const res = await axios.get(`http://localhost:3001/comments`);
            let comments = res.data.body;
            console.log("CommentsSsSsSs", comments)
            for(let i of comments) {
                obj[i.comment_id] = i;
            }
            this.setState({
                comments: obj
            })
            console.log("Commentssssss", this.state.comments)

        } catch (error) {
            console.log(error)
        }
    }

    getHashtags = async () => {
        let obj = {};
        try{
            let response = await axios.get(`http://localhost:3001/hashtags/`);
            let results = response.data.body
            console.log("LOOK AT THIS", results)
            for(let tag of results) {
                obj[tag.image_id] = tag.hashtag
            }
            this.setState({
                hashtags: obj
            })
        } catch (error) {
            console.log(error)
        }
    }

    componentDidMount() {
        this.getComments();
        this.getHashtags();
    }

    render() {
        const { username, comments, hashtags } = this.state
         
        console.log(comments, "Comments", hashtags)
        console.log(this.props.pictures, "PICTURESSSSSS PETE")
        const childElements = this.props.pictures.map(function (element) {
            console.log(element, "ELEMENT")
          
            
                let tags = [];
                let commentsThings = [];
                for (let i in hashtags) {
                    console.log("YOU NEED TO LOOK HERE", i, element.id)
                    // console.log(i, "hashtag i")
                    if(i == element.id) {
                        // console.log("YOU NEED TO LOOK HERE", i, element.id)
                        tags.push(`#${hashtags[i]} `)
                    }
                }
                console.log(tags)
                for (let i in comments) {
                    // console.log("Comments stuff", comments.i)
                    if(comments[i].image_id === element.id) {
                        console.log("COMMENTS ID", i)
                        commentsThings.push(`${comments[i].commentors_name}: ${comments[i].comment}`)
                    }
                } 
                // console.log("COMMENTS", commentsThings)
          
            let height = ''
            let width = ''
            if (element.id % 2 === 0) {
                height = 250
            }
            else if (element.id % 3 === 0) {
                height = 350
            }
            else if (element.id % 5 === 0) {
                height = 450
            } else if (element.id % 7 === 0){
                height = 575
            } else{
                height = 600
            }
            // else(
            //     height = 500
            // )
            // let height = element.id % 2 === 0 ? 300 : 200;

            // console.log(height)
            return (
                <div>
                    <Picture url={element.image_url}
                        id={element.id}
                        key={element.id}
                        alt={element.alt}
                        username={username}
                        poster_name={element.poster_name}
                        caption={element.caption}
                        height={height}
                        comments = {comments}

                    />

                    <p>{tags}</p>
                    <p>{commentsThings}</p>
                </div>


            );
        });


        return (
                <Masonry
                    className={'my-gallery-class'} // default ''
                    elementType={'ul'} // default 'div'
                    options={masonryOptions} // default {}
                    disableImagesLoaded={false} // default false
                    updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                    imagesLoadedOptions={imagesLoadedOptions} // default {}
                    style={style}
                >
                    
                        {childElements}
                   
                </Masonry>

        );
    }

}
            
export default PictureDisplay;