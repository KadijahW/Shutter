import React from 'react';
import Picture from './Picture';
import Masonry from 'react-masonry-component';

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
        this.state = {
            username: props.username
        }
    }

    // popState = (props) => {
    //     console.log(props)
    // }
    // componentDidMount() {
    //     this.popState()
    // }
    render() {
        const { username } = this.state
        const childElements = this.props.pictures.map(function (element) {
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

            console.log(height)
            return (
                // <li className="image-element-class">
                //     <img src={element.image_url} />
                // </li>
                // <picture className='pictureDisplay'>
                    <Picture url={element.image_url}
                        id={element.id}
                        key={element.id}
                        alt={element.alt}
                        username={username}
                        poster_name={element.poster_name}
                        caption={element.caption}
                        height={height}

                    />
                // </picture>

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



// const PictureDisplay = (props) => {
//     let properHashtag = [];
//     let filteredHashtag = "";
//     return (
//         props.pictures.map((picture) => {

//             const breakpointColumnsObj = {
//                 default: 4,
//                 1100: 3,
//                 700: 2,
//                 500: 1
//             };
//             return (
//                 <div id='picture'>
//                     <Masonry
//                         breakpointCols={breakpointColumnsObj}
//                         className="my-masonry-grid"
//                         columnClassName="my-masonry-grid_column">
//                         <Picture url={picture.image_url}
//                             id={picture.id}
//                             key={picture.id}
//                             alt={picture.alt}
//                             username={props.username}
//                             poster_name={picture.poster_name}
//                             caption={picture.caption}
//                             hashtag={filteredHashtag}
//                         />
//                     </Masonry>
//                 </div>
//             )
//         }
//         )
//     )
// }

// export default PictureDisplay;