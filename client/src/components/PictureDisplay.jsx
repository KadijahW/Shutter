import React from 'react';
import Picture from './Picture';


const PictureDisplay = (props) => {
    let hashtags = props.hashtags;
    let commentsProp = props.comments;
    console.log(commentsProp, "CommentsProp")

    return (
            props.pictures.map((picture) => {
                let tags = [];
                let comments = [];
                for (let i in hashtags) {
                    if(hashtags[i] === picture.id) {
                        tags.push(`#${i} `)
                    }
                }
                for (let i in commentsProp) {
                    console.log("Comments stuff", commentsProp[i])
                    if(commentsProp[i].image_id === picture.id) {
                        console.log("COMMENTS ID", i)
                        comments.push(`${commentsProp[i].commentors_name}: ${commentsProp[i].comment}`)
                    }
                } console.log("COMMENTS", comments)
                return (
                    <div id='picture'>
                        <Picture url={picture.image_url}
                            id={picture.id}
                            key={picture.id}
                            alt={picture.alt}
                            username={props.username}
                            poster_name={picture.poster_name}
                            caption={picture.caption}

                        />
                        <em>{tags}</em>
                        <p>{comments}</p>
                    </div>
                )
            }
            )
    )
}
            
            

 
export default PictureDisplay;