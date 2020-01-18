import React from 'react';
import PictureDisplay from './PictureDisplay';
import axios from 'axios';

class Search extends React.Component {
    constructor(props) {
        console.log(props)
        super()
        this.state = {
            pictures: [],
            searched: props.searched
        }
    }
    searchImages = async () => {
        const {searched } = this.state
        console.log(searched)
        let word = `pianoMan`
        try{
        let pictures = await axios.get(`http://localhost:3001/hashtags/${word}`);
        console.log(pictures.data.body)
        this.setState({
            pictures: pictures.data.body
        })}
        catch(error){
            console.log(error, `not found`)
        }
    }
    componentDidMount = () => {
        this.searchImages()
    }
    render() {
        const { pictures } = this.state
        return (
            <p>pictures</p>
            // <PictureDisplay pictures = {pictures}/>
        )
    }
}
export default Search;