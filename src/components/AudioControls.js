import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setPlayingTrue, setPlayingFalse, setAudio } from '../actions/control';

class AudioControls extends Component {
    state = { defaultVolume: 1, lastPreviewUrl: null }

    statusIcon = (playingPreviewUrl) => {
        if (!playingPreviewUrl) {
            return <span>N/A</span>;
        }

        if (
            this.props.audiocontrol.playing &&
            this.props.audiocontrol.previewUrl === playingPreviewUrl
        ) {
            // this.props.setPlayingTrue();
            return <span>| |</span>;
        }
        // this.props.setPlayingFalse();
        return <span>&#9654;</span>;
    }

    callPlayAudio = () => () => {
        if(this.props.audiocontrol.playing) {
            this.props.setPlayingFalse();
        }
        else {
            this.props.setPlayingTrue();
        }
    }

    playAudio = (previewUrl) => {
        this.setState({playingPreviewUrl: previewUrl});
        if (this.props.audiocontrol.playing) {
            console.log('play');
            this.fadeInAudio(this.props.audiocontrol.audio);
        } 
        else {
            console.log('pause');
            this.fadeOutAudio(this.props.audiocontrol.audio);
        }
    }

    fadeInAudio = (audioObj) => {
        audioObj.volume = this.state.defaultVolume;
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
        let currentAudio = this.props.audiocontrol.audio;
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
        if (prevProps.audiocontrol !== this.props.audiocontrol) {
            this.playAudio(this.props.audiocontrol.previewUrl);
        }
    }

    render() {
        // console.log('dispactched',this.props);

        const { previewUrl, albumArt, artistName, trackName } = this.props.audiocontrol;

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
                                        <h5 className='my-0'>{artistName}</h5>
                                    </div>
                                    <div className='text-left'>
                                        <p className='my-0 track-title'>{trackName}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-25 my-auto'>
                        <div className='d-flex justify-content-end'>
                            <div className='play' onClick={this.callPlayAudio(previewUrl)}>{this.statusIcon(previewUrl)}</div>
                        </div>
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
    // ({ control_status: { control_status,previewUrl } }) => ({ control_status,previewUrl }),
    (mapStateToProps),
    { setPlayingTrue, setPlayingFalse, setAudio }
)(AudioControls);