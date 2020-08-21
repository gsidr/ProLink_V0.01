import { combineReducers } from 'redux';
import auth from "./auth";
import alert from './alert';
import profile from "./profile";
import post from "./post";
// import { firestoreReducer } from 'redux-firestore';
// import { firebaseReducer } from 'react-redux-firebase'


export default combineReducers({
    alert,
    auth,
    profile,
    post
    // firestore: firestoreReducer,
    // firebase: firebaseReducer
});

