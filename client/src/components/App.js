import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CONFIG from '../data/config.js'
import Artist from './Artist';
import Albums from './Albums';
import Tracks from './Tracks';
import Search from './Search';
import AudioControls from './AudioControls';

const API_ADDRESS = CONFIG[0].api_address;
const BASE_URL = CONFIG[0].base_url;

class App extends Component {
    state = { searched: false, artist: null, trackName: null, albums: [], tracks: [], audiocontrols: { displayAlbum: true, playingPreviewUrl: null, playingArtist: null, albumArt: null, playing: null } };

    componentDidMount() {
        this.setArtist();
    }

    setArtist = (artistName) => {
        if(artistName) {
            this.searchArtist(artistName);
        } else {
            this.searchArtist('THE VAMPS');
        }
    }

    searchArtist = (artistQuery, searched) => {
        fetch(`${API_ADDRESS}/artists/${artistQuery}`)
        .then(result => result.json())
        .then(json => {
            if(json.artists.total > 0) {
                const artist = json.artists.items[0];

                fetch(`${API_ADDRESS}/albums/${artist.id}`)
                .then(response => response.json())
                .then(json => {
                    console.log(json.items);
                    this.setState({ artist });
                    this.setState({albums: json.items})
                })
                .then(() => {
                    if(searched === true) {
                        // console.log('data receive 2');
                        this.props.history.push(BASE_URL);
                    }
                })
                .catch(error => alert(error.message));
            }
        })
        .catch(error => alert(error.message));
    };

    goToTracks = () => {
        this.setState({displayAlbum: false})
    }

    render() {
        return (
            <div className='content-wrapper'>
                <div className='row mx-0'>
                    <div className='sidebar col-12 col-xl-3 px-0'>
                        <div className='mt-4 mb-4'>
                            <h2>Music Master</h2>
                            <hr className='divider'/>
                            {/* passing state through props */}
                            <Artist artist={this.state.artist} />
                        </div>
                    </div>
                    <div className='col-12 col-xl-9 px-0'>
                        <div className='search-library'>
                            {/* passing down call backs */}
                            <Search searchArtist={this.searchArtist} />
                            {/* passing down call backs */}
                        </div>
                            <Route exact path={BASE_URL} render={(props) => <Albums albums={this.state.albums} artist={this.state.artist} {...props} /> } />
                            <Route exact path={`${BASE_URL}artist/:artistid/tracks/:id`} render={(props) => <Tracks setArtist={this.setArtist} trackIcon={this.trackIcon} {...props} /> } />
                    </div>
                    <div className='col-12'>
                        {/* passing state through props */}
                        <AudioControls trackName={this.state.trackName} playAudio={this.playAudio} audiocontrols={this.state.audiocontrols} />
                    </div>
                </div>
            </div>
        )
    }
}

export default App;