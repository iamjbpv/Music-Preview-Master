import { SET_CONTROL, SET_TRACK, SET_AUDIO  } from '../actions/types';

const DEFAULT_CONTROL_STATE = { playing: '', previewUrl: '', albumArt: 'http://www.byustore.com/byu-vinson/img/no_image_available.jpeg?resizeid=2&resizeh=1200&resizew=1200', artistName: '', trackName: '', audio: null };

const controlStateReducer = (state = DEFAULT_CONTROL_STATE, action) => {
    console.log('action',action);
    switch(action.type) {
        case SET_CONTROL:
            return { ...state, playing: action.playing }
        case SET_TRACK:
            return { ...state, playing: action.playing, previewUrl: action.previewUrl, albumArt:action.albumArt, artistName: action.artistName, trackName: action.trackName, audio: action.audio };
        case SET_AUDIO:
                return { ...state, audio: action.audio }
        default:
            return state;
    }
}

export default controlStateReducer;