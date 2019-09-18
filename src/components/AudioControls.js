import React, { Component } from 'react';

class AudioControls extends Component {

    render() {
        // if(!artist) return null;
        const image = this.props.image ? this.props.image : 'http://www.byustore.com/byu-vinson/img/no_image_available.jpeg?resizeid=2&resizeh=1200&resizew=1200';
        const name = (this.props.artist) ? this.props.artist.name : '';

        return (
            <div className='audio-control-wrapper'>
                <div className='d-flex justify-content-between h-100 px-3'>
                    <div className='w-25 my-auto'>
                        <div className='d-flex justify-content-start'>
                            <div>
                                <img className='album-art' src={image} />
                            </div>
                            <div className='ml-2 my-auto'>
                                <h5>{name}</h5>
                            </div>
                        </div>
                    </div>
                    <div className='w-50 my-auto d-none d-xl-block'>
                        
                    </div>
                    <div className='w-25 my-auto'>
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default AudioControls;