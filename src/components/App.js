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
    state = { searched: false, artist: null, albums: [], tracks: [], displayAlbum: true, playing: false, audio: null, playingPreviewUrl: null, defaultVolume: 0 };

    componentDidMount() {
        // this.searchArtist('LANY');
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
                    // console.log('data receive');
                    this.setState({ artist });
                    this.setState({albums: json.albums})
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

    setArtist = (artistName) => {
        this.setState({searched: true});
    }

    // getTrack = (albumID, albumImage) => {
    //     this.setState({ albumImage: albumImage });
    //     fetch(`${API_ADDRESS}/tracks/${albumID}`)
    //     .then(response => response.json())
    //     .then(json => {
    //         this.setState({tracks: json.items})
    //         this.goToTracks();
    //     })
    //     .catch(error => alert(error.message));
    // }

    getAlbumArt = (images) => {
        this.setState({ albumImage: images.url });
    }

    goToTracks = () => {
        this.setState({displayAlbum: false})
    }

    setPreviewUrl = (preview_url) => {
        this.playAudio(preview_url);
    }

    trackIcon = (track) => {
        // if (!track.preview_url) {
        //     console.log('sfasa');
        //     return <span>N/A</span>;
        // }

        // if (
        //     this.state.playing &&
        //     this.state.playingPreviewUrl === track.preview_url
        // ) {
        //     console.log('sfasa');
        //     return <span>| |</span>;
        // }
        
        // return <span>&#9654;</span>;
    }

    playAudio = (previewUrl) => {
        const audio = new Audio(previewUrl);

        if (!this.state.playing) {
            this.fadeInAudio(audio);
            this.setState({ playing: true, audio, playingPreviewUrl: previewUrl });
        } else {
            this.fadeOutAudio(audio);

            if (this.state.playingPreviewUrl === previewUrl) {
                this.setState({ playing: false });
            } else {
                this.fadeInAudio(audio);
                this.setState({ audio, playingPreviewUrl: previewUrl });
            }
        }
        
    }

    fadeInAudio = (audio) => {
        audio.volume = this.state.defaultVolume;
        audio.play();
        let fadeInterval = setInterval(function(){
            if(audio.volume >= 0.9){
                audio.volume = 1;
                clearInterval(fadeInterval);
                return;
            }
            else {
                audio.volume += 0.05;
                // console.log(audio.volume);
            }
            
        },100);
    }

    fadeOutAudio = () => {
        let currentAudio = this.state.audio;

        let fadeInterval = setInterval(function(){
            if(currentAudio.volume <= 0.1){
                currentAudio.pause();
                clearInterval(fadeInterval);
                return;
            }
            else {
                currentAudio.volume -= 0.10;
            }
            
        },100);
    }

    // componentDidUpdate() {
    //     console.log(this.state.items);
    // }

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
                            <Route exact path={BASE_URL} render={(props) => <Albums getAlbumArt={this.getAlbumArt} albums={this.state.albums} artist={this.state.artist} {...props} /> } />
                            <Route exact path={`${BASE_URL}artist/:artistid/tracks/:id`} render={(props) => <Tracks setArtist={this.setArtist} trackIcon={this.trackIcon} setPreviewUrl={this.setPreviewUrl} {...props} /> } />
                    </div>
                    <div className='col-12'>
                        {/* passing state through props */}
                        <AudioControls image={this.state.albumImage} artist={this.state.artist} />
                    </div>
                </div>
            </div>
        )
    }
}

export default App;