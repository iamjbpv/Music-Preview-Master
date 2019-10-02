import React, { Component } from 'react';
import CONFIG from '../data/config';
import { connect } from 'react-redux';
import { setPlayingTrue, setPlayingFalse, setTrack, setAudio } from '../actions/control';

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
            this.props.audiocontrol.playing &&
            this.props.audiocontrol.previewUrl === track.preview_url
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

    setPreviewUrl = (previewUrl,trackName) => () => {
        if(!this.props.audiocontrol.audio) {
            const audio = new Audio(previewUrl);
            this.props.setTrack(true, previewUrl,this.state.albumArt,this.state.artistName, trackName, audio);
        }
        else if(this.props.audiocontrol.previewUrl === previewUrl) {
            (this.props.audiocontrol.playing) ? this.props.setPlayingFalse() : this.props.setPlayingTrue();
        }
        else {
            this.props.setPlayingFalse();
            const audio = new Audio(previewUrl);
            setTimeout(() => {
                this.props.setTrack(true, previewUrl,this.state.albumArt,this.state.artistName, trackName, audio);
            }, 50);
        }
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

const mapStateToProps = (state) => ({ 
    audiocontrol: state.audiocontrol,
    // any props you need else
});

export default connect(
    (mapStateToProps),
    { setPlayingTrue, setPlayingFalse, setTrack, setAudio }
)(Tracks);