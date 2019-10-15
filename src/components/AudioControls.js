import React, { Component } from 'react';
import { Range } from 'react-range';
import { connect } from 'react-redux';
import { setPlayingTrue, setPlayingFalse, setAudio, setVolume } from '../actions/control';

class AudioControls extends Component {
    state = { mobile_vol_show: false, lastPreviewUrl: null,values: [1] }
    
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

    mobileVolumeToggle = () => () => {
        this.setState({ mobile_vol_show: !this.state.mobile_vol_show })
    }

    statusVolume = () => {
        return <i className='fas fa-volume-up'></i>;
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
            if(this.props.audiocontrol.audio) {
                console.log('pause');
                this.fadeOutAudio(this.props.audiocontrol.audio);
            }
            //do nothing
        }
    }

    validateAudio = () => {
        return (this.props.audiocontrol.audio) ? true : false;
    }

    fadeInAudio = (audioObj) => {
        audioObj.volume = this.props.audiocontrol.volume;
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

    changeVolume = (values) => {
        // console.log(values);
        this.props.setVolume(values[0]);
        this.setState({ values: values });
        if(this.validateAudio()) {
            this.props.audiocontrol.audio.volume = values[0];
        }
        // this.setState({ values })
    }

    componentDidMount() {
        this.setState({ values: [this.props.audiocontrol.volume] });
    }

    componentDidUpdate(prevProps) {
       
        // if (prevProps.audiocontrol !== this.props.audiocontrol) {
        if(prevProps.audiocontrol.audio !== this.props.audiocontrol.audio || prevProps.audiocontrol.playing !== this.props.audiocontrol.playing ) {
            this.playAudio(this.props.audiocontrol.previewUrl);
        }
            
        // }

        if (prevProps.audiocontrol.volume !== this.props.audiocontrol.volume) {
            console.log('change vol');
        }
    }

    render() {
        // console.log('dispactched',this.props);

        const { previewUrl, albumArt, artistName, trackName, volume } = this.props.audiocontrol;
        // console.log('volume', volume);
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
                    <div className='w-50 my-auto'>
                        <div className='d-flex justify-content-end h-100'>
                            <div className='px-2' onClick={this.mobileVolumeToggle()}>
                                {this.statusVolume()}
                            </div>
                            <div className='mobile-volume my-auto px-2' style={{ display: (this.state.mobile_vol_show) ? 'block' : 'none' }}>
                                <Range
                                    step={0.1}
                                    min={0}
                                    max={1}
                                    values={this.state.values}
                                    onChange={values => this.changeVolume( values )}
                                    renderTrack={({ props, children }) => (
                                    <div
                                        {...props}
                                        style={{
                                        ...props.style,
                                        height: '10px',
                                        width: '100px',
                                        backgroundColor: '#ccc',
                                        borderRadius: '10px'
                                        }}
                                    >
                                        {children}
                                    </div>
                                    )}
                                    renderThumb={({ props }) => (
                                    <div
                                        {...props}
                                        style={{
                                        ...props.style,
                                        height: '10px',
                                        width: '10px',
                                        backgroundColor: '#45aaf2',
                                        borderRadius: '10px'
                                        }}
                                    />
                                    )}
                                />
                            </div>
                            <div className='play px-2' onClick={this.callPlayAudio(previewUrl)}>{this.statusIcon(previewUrl)}</div>
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
    { setPlayingTrue, setPlayingFalse, setAudio, setVolume }
)(AudioControls);