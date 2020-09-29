import { combineReducers } from 'redux';
import controlReducer from './control';

export default combineReducers({ 
    audiocontrol: controlReducer
});