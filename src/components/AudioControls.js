import React, { Component } from 'react';

class AudioControls extends Component {
    state = { audiocontrols : { playing: false, audio: null, playingPreviewUrl: null, defaultVolume: 1, lastPreviewUrl: null } }

    statusIcon = (playingPreviewUrl) => {
        if (!playingPreviewUrl) {
            return <span>N/A</span>;
        }

        if (
            this.state.audiocontrols.playing &&
            this.state.audiocontrols.playingPreviewUrl === playingPreviewUrl
        ) {
            return <span>| |</span>;
        }
        
        return <span>&#9654;</span>;
    }

    callPlayAudio = (playingPreviewUrl) => () => {
        this.playAudio(playingPreviewUrl);
    }

    playAudio = (previewUrl) => {
        if (!this.state.audiocontrols.playing) {

            if(!this.state.audiocontrols.audio) {
                const audio = new Audio(previewUrl);
                this.fadeInAudio(audio);
                this.setState({
                    audiocontrols: {
                        ...this.state.audiocontrols,
                        audio, playingPreviewUrl: previewUrl, playing: true
                    }
                });
            }
            else {
                // console.log('audio state', this.state.audiocontrols);
                this.fadeInAudio(this.state.audiocontrols.audio);
                this.setState({
                    audiocontrols: {
                        ...this.state.audiocontrols,
                        playing: true, playingPreviewUrl: previewUrl
                    }
                });
            }
        } else {
            this.fadeOutAudio(this.state.audiocontrols.audio);
            if (this.state.audiocontrols.playingPreviewUrl === previewUrl) {
                this.setState({
                    audiocontrols: {
                        ...this.state.audiocontrols,
                        playing: false, lastPreviewUrl: previewUrl
                    }
                });
            } else {
                const audio = new Audio(previewUrl);
                this.fadeInAudio(audio);
                this.setState({
                    audiocontrols: {
                        ...this.state.audiocontrols,
                        audio, playingPreviewUrl: previewUrl
                    }
                });
            }
        }
        
    }

    fadeInAudio = (audioObj) => {
        audioObj.volume = this.state.audiocontrols.defaultVolume;
        audioObj.play();
        // let fadeInterval = setInterval(function(){
        //     if(audioObj.volume >= 0.9){
        //         audioObj.volume = 1;
        //         clearInterval(fadeInterval);
        //         return;
        //     }
        //     else {
        //         audioObj.volume += 0.9;
        //         // console.log(audio.volume);
        //     }
            
        // },100);
    }

    fadeOutAudio = () => {
        let currentAudio = this.state.audiocontrols.audio;
        currentAudio.pause();
        // let fadeInterval = setInterval(function(){
        //     if(currentAudio.volume <= 0.1){
        //         currentAudio.pause();
        //         clearInterval(fadeInterval);
        //         return;
        //     }
        //     else {
        //         currentAudio.volume -= 0.9;
        //     }
            
        // },100);
    }

    audioControl = (playing,playingPreviewUrl) => () => {
        this.props.playAudio(playingPreviewUrl);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.audiocontrols !== this.props.audiocontrols) {
            // this.playAudio(this.props.playingPreviewUrl);
            // console.log('props',this.props.playingPreviewUrl);
            this.playAudio(this.props.audiocontrols.playingPreviewUrl);
        }
    }

    render() {
        // console.log(this.props.artist);
        // if(!artist) return null;
        const albumArt = this.props.audiocontrols.albumArt ? this.props.audiocontrols.albumArt : 'http://www.byustore.com/byu-vinson/img/no_image_available.jpeg?resizeid=2&resizeh=1200&resizew=1200';
        const playingArtist = (this.props.audiocontrols.playingArtist) ? this.props.audiocontrols.playingArtist : '';
        const trackname = (this.props.audiocontrols.trackName) ? this.props.audiocontrols.trackName : '';
        // console.log(trackname);
        const { playingPreviewUrl } = this.props.audiocontrols;

        return (
            <div className='audio-control-wrapper'>
                <div className='d-flex justify-content-between h-100 px-3'>
                    <div className='w-75 my-auto'>
                        <div className='d-flex justify-content-start'>
                            <div>
                                <img className='album-art' src={albumArt} />
                            </div>
                            <div className='ml-2 my-auto'>
                                <div className='d-flex flex-column justify-content-start'>
                                    <div className='text-left'>
                                        <h5 className='my-0'>{playingArtist}</h5>
                                    </div>
                                    <div className='text-left'>
                                        <p className='my-0 track-title'>{trackname}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-25 my-auto'>
                        <div className='d-flex justify-content-end'>
                            <div onClick={this.callPlayAudio(playingPreviewUrl)}>{this.statusIcon(playingPreviewUrl)}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AudioControls;