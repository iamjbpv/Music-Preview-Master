import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CONFIG from '../data/config.js'

const BASE_URL = CONFIG[0].base_url;

const AlbumsList = props => {
    const { id, name, images } = props.album;
    return (
        <div>
            <img 
                src={images[0].url} 
                alt='track-image'
                className='track-image'
            />
            
            <p className='track-text'>{name}</p>
        </div>
    )
}


class Albums extends Component {

    getTrack = (id,url) => () => {
        this.props.getTrack(id,url);
    }

    getAlbumArt = (images) => () => {
        this.props.getAlbumArt(images[0]);
    }

    render() {
        const artist_id = (this.props.artist) ? this.props.artist.id : '';
        const { albums } = this.props;
        // console.log(albums);
        return (
            <div>
                <div className='music-library-header'>
                    <div className='d-flex justify-content-center h-100'>
                        <div className='my-auto'>
                            <h3 className='my-0'>Albums</h3>
                        </div>
                    </div>
                </div>
                <div className='music-library'>
                    <div className='d-flex justify-content-center flex-wrap w-100'>
                        {
                            albums.map(album => (
                                
                                <div
                                    key={album.id}
                                    className='track'
                                >
                                <Link onClick={this.getAlbumArt(album.images)} to={`artist/${artist_id}/tracks/${album.id}`}>
                                    <AlbumsList key={album.id} album={album}/>
                                </Link>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Albums;