import React, { Component } from 'react';
import CONFIG from '../data/config';

const API_ADDRESS = CONFIG[0].api_address;

class Tracks extends Component {
    state = { artistName: null, tracks: [], playing: false, audio: null, playingPreviewUrl: null, defaultVolume: 0, albumArt: '', albumTitle: null };
   

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
            this.setState({artistName, albumArt: albumData[0].images[0].url, albumTitle: albumData[0].name});
            this.fetchTracks(API_ADDRESS, id);
            
        })
        .catch(error => alert(error.message));
    }

    fetchTracks = (API_ADDRESS, id) => {
        fetch(`${API_ADDRESS}/tracks/${id}`)
        .then(response => response.json())
        .then(json => {
            this.setState({tracks: json.items})
        })
        .catch(error => alert(error.message));
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
        if (!this.state.playing) {
            this.setState({ playing: true, playingPreviewUrl: preview_url });
        } else {

            if (this.state.playingPreviewUrl === preview_url) {
                this.setState({ playing: false });
            } else {
                this.setState({ playingPreviewUrl: preview_url });
            }
        }
        this.props.setPreviewUrl(preview_url, trackName, this.state.artistName, this.state.albumArt, this.state.playing);
    }

    render() {
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
                                            src={this.state.albumArt} 
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