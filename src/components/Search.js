import React, { Component } from 'react';

class Search extends Component {
    state = { artistQuery: 'LANY', searched: true}

    componentDidMount(){
        let searched = false;
        this.searchArtist(searched);
    }
    updateArtistQuery = event => {
        // console.log(event.target.value);
        this.setState({artistQuery: event.target.value});
    };

    handleKeyPress = event => {
        if (event.key === 'Enter') {
            let searched = true;
            this.searchArtist(searched);
        }
    };

    searchArtist = (searched) => {
        this.props.searchArtist(this.state.artistQuery, searched);
    }
    
    render() {
        return (
            <div className='d-flex justify-content-start'>
                <input 
                    className='form-control search-input'
                    onChange={this.updateArtistQuery}
                    onKeyPress={this.handleKeyPress}
                    placeholder='Search For an Artist' 
                />
                {/* <button className='btn btn-flat' onClick={this.searchArtist}>Search</button> */}
            </div>
        )
    }
}

export default Search;