import React from 'react';
import PictureDisplay from './PictureDisplay';
import axios from 'axios';

class Search extends React.Component {
    constructor(props) {
        console.log(props)
        super()
        this.state = {
            id: [],
            pictures: [],
            searched: '', 
            search:''
        }
    }
    handleSearchChange = (event) => {
        console.log(event.target.value)
        this.setState({
            search: event.target.value
        })

    }
   
    searchImages = async (event) => {
        event.preventDefault()
        const {search, id } = this.state
        let word = `pianoMan`
        try{
        let res = await axios.get(`http://localhost:3001/hashtags/${search}`);
        console.log(res.data.body)
        let newArr = []
        res.data.body.map((pic) => {
            newArr = [...newArr, pic.image_id]
        })
        this.setState({
            id: newArr
        })
        this.getSinglePicture()
    }
        catch(error){
            console.log(error, `not found`)
        }
    }
    getSinglePicture = async () => {
        // event.preventDefault()
        const { id } = this.state;
        for(let i = 0; i<id.length; i++){
            let arr = [];
            let newArr = [];
            try {
             const res = await axios.get(`http://localhost:3001/images/${id[i]}`)
             console.log(res.data.payload)
        arr=res.data.payload
        arr.map((picture) => {
            newArr = [...newArr, picture]
        })
    
        console.log('newArr', newArr)
        this.setState({
            pictures: newArr
        })
            } catch (error) {
             console.log(error)
            }
        }
    }
    // componentDidMount = () => {
    //     // this.getSinglePicture()
    // }

    render() {
        const { pictures } = this.state
        return (
            <>
              <form onSubmit={this.searchImages}>
                    <label htmlFor='search'> Search
                    <input name='search' type='text' placeholder='Search' onChange={this.handleSearchChange} />
                    </label>
                    <input type='submit' value='Search' onSubmit = {this.searchImages}></input>
                </form>
            {/* // <p>pictures</p> */}
            <PictureDisplay pictures = {pictures}/>
            </>
        )
    }
}
export default Search;