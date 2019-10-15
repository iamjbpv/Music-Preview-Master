import { SET_CONTROL, SET_TRACK, SET_AUDIO, SET_VOLUME } from './types';

export const setPlayingTrue = () => {
    return { type: SET_CONTROL, playing: true};
}

export const setPlayingFalse = () => {
    return { type: SET_CONTROL, playing: false };
}

export const setTrack = (playing,previewUrl,albumArt,artistName, trackName, audio) => {
    return { type: SET_TRACK, playing, previewUrl, albumArt, artistName, trackName, audio };
}

export const setAudio = (audio) => {
    return { type: SET_AUDIO, audio: audio };
}

export const setVolume = (volume) => {
    return { type: SET_VOLUME, volume: volume };
}

// export const setAlbumArt = (albumArt) => {
//     return { type: SET_ALBUM_ART, albumArt: albumArt };
// }

// export const setArtist = (artistName) => {
//     return { type: SET_ARTIST, artistName: artistName };
// }