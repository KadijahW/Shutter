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
    componentDidUpdate = () => {
        this.searchImages()
    }
    render() {
        const { pictures } = this.state
        return (
            <>
              <form onSubmit={this.handleSearchSubmit}>
                    <label htmlFor='search'> Search
                    <input name='search' type='text' placeholder='Search' onChange={this.handleSearchChange} />
                    </label>

                </form>
            // <p>pictures</p>
            <PictureDisplay pictures = {pictures}/>
            </>
        )
    }
}
export default Search;