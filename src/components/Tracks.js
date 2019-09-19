import React, { Component } from 'react';
import CONFIG from '../data/config';

const API_ADDRESS = CONFIG[0].api_address;

class Tracks extends Component {
    state = { tracks: [], playing: false, audio: null, playingPreviewUrl: null, defaultVolume: 0, albumImage: '', albumTitle: null };
   

    componentDidMount() {
        // 49tQo2QULno7gxHutgccqF
        const { artistid, id } = this.props.match.params;
      
        fetch(`${API_ADDRESS}/albums/${artistid}`)
        .then(response => response.json())
        .then(json => {
            const artistName = json.albums[0].artists[0].name;
            this.setArtist(artistName);
            let albumData =  json.albums.filter(function(album) {
                return album.id == id;
            });
            this.getAlbumArt(albumData[0].images[0].url);
            this.setState({albumImage: albumData[0].images[0].url, albumTitle: albumData[0].name});
            this.fetchTracks(API_ADDRESS, id);
            
        })
        .catch(error => alert(error.message));
    }

    getAlbumArt = (images) => {
        this.props.getAlbumArt(images);
    }

    fetchTracks = (API_ADDRESS, id) => {
        fetch(`${API_ADDRESS}/tracks/${id}`)
        .then(response => response.json())
        .then(json => {
            this.setState({tracks: json.items})
        })
        .catch(error => alert(error.message));
    }

    playAudio = previewUrl => () => {
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

    trackIcon = (track) => {
        if (!track.preview_url) {
            return <span>N/A</span>;
        }

        if (
            this.state.playing &&
            this.state.playingPreviewUrl === track.preview_url
        ) {
            return <span>| |</span>;
        }
        
        return <span>&#9654;</span>;
    }

    setArtist = (artistName) => {
        this.props.setArtist(artistName);
    }

    goToAlbum = () => () => {
        this.props.goToAlbum();
    }

    setPreviewUrl = (preview_url,trackName) => () => {
        this.props.setPreviewUrl(preview_url, trackName);
        if (!this.state.playing) {
            this.setState({ playing: true, playingPreviewUrl: preview_url });
        } else {

            if (this.state.playingPreviewUrl === preview_url) {
                this.setState({ playing: false });
            } else {
                this.setState({ playingPreviewUrl: preview_url });
            }
        }
    }

    render() {
        // console.log(this.props.albumImage);
        // console.log(image);
        // console.log(tracks);
        return (
            <div>
                <div className='music-library-header'>
                    <div className='d-flex justify-content-center h-100'>
                        <div className='my-auto d-flex justify-content-center'>
                            <div>
                                <h3 className='mt-2'>{this.state.albumTitle}</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='music-library'>
                    <div className='d-flex justify-content-center flex-wrap w-100'>
                    {
                            this.state.tracks.map(track => {
                                const { id, name, album, preview_url } = track;

                                return (
                                    
                                    <div
                                        key={id} 
                                        onClick={this.setPreviewUrl(preview_url,name)}
                                        className='track'
                                    >
                                        <img 
                                            src={this.state.albumImage} 
                                            alt='track-image'
                                            className='track-image'
                                        />
                                        {/* <audio controls>
                                            <source src={preview_url} />
                                        </audio> */}

                                        <p className='track-text'>{name}</p>
                                        <div className="d-flex justify-content-center align-self-center w-100 overlay">
                                            <div className='my-auto'>
                                                <p className='track-icon'>{this.trackIcon(track)}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Tracks;