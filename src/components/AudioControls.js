import React, { Component } from 'react';

class AudioControls extends Component {
    statusIcon = (playing,preview_url,lastPreviewUrl) => {
        if (
            playing
        ) {
            return <span>| |</span>;
        }

        if (
            !playing && 
            lastPreviewUrl === preview_url
        ) {
            return <span>&#9654;</span>;
        }
        
       
    }

    audioControl = (playing,playingPreviewUrl) => () => {
        this.props.playAudio(playingPreviewUrl);
    }

    render() {
        // console.log(this.props.artist);
        // if(!artist) return null;
        const image = this.props.image ? this.props.image : 'http://www.byustore.com/byu-vinson/img/no_image_available.jpeg?resizeid=2&resizeh=1200&resizew=1200';
        const name = (this.props.artist) ? this.props.artist.name : '';
        const trackname = (this.props.trackName) ? this.props.trackName : '';
        // console.log(trackname);
        const { audiocontrols } = this.props;

        return (
            <div className='audio-control-wrapper'>
                <div className='d-flex justify-content-between h-100 px-3'>
                    <div className='w-25 my-auto'>
                        <div className='d-flex justify-content-start'>
                            <div>
                                <img className='album-art' src={image} />
                            </div>
                            <div className='ml-2 my-auto'>
                                <div className='d-flex flex-column justify-content-start'>
                                    <div className='text-left'>
                                        <h5 className='my-0'>{name}</h5>
                                    </div>
                                    <div className='text-left'>
                                        <p className='my-0 track-title'>{trackname}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-50 my-auto d-none d-xl-block'>
                        
                    </div>
                    <div className='w-25 my-auto'>
                        <div className='d-flex justify-content-end'>
                            <div onClick={this.audioControl(audiocontrols.playing, audiocontrols.playingPreviewUrl, audiocontrols.lastPreviewUrl)}>{this.statusIcon(audiocontrols.playing, audiocontrols.playingPreviewUrl, audiocontrols.lastPreviewUrl)}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AudioControls;