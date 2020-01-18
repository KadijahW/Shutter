import React from 'react';
import Picture from './Picture';
import Masonry from 'react-masonry-component';
import './CSS/HomePage.css';


const masonryOptions = {
    transitionDuration: 8
};
const style = {
    // backgroundColor: 'tomato',
    // alignItems: 'center'
};
const imagesLoadedOptions = { background: '.my-bg-image-el' }

class PictureDisplay extends React.Component {
    constructor(props) {
        console.log(`PROPS`, props)
        super()
        this.state = {
            username: props.username
        }
    }
    render() {
        const { username } = this.state
        const childElements = this.props.pictures.map(function (element) {

            let height = '';
            if (element.id % 2 === 0) {
                height = 250
            }
            else if (element.id % 3 === 0) {
                height = 275
            }
            else if (element.id % 5 === 0) {
                height = 300
            } else if (element.id % 7 === 0) {
                height = 450
            } else if (element.id % 9 === 0) {
                height = 575
            }
            else {
                height = 600
            }
            // let height = element.id % 2 === 0 ? 300 : 200;

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
