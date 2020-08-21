import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import {  getFirebase } from "react-redux-firebase";
import {
  reduxFirestore,
  getFirestore,
  
} from "redux-firestore";
import firebase from "firebase/app";
import fbConfig from "./firebase/config";
import setAuthToken from './utils/setAuthToken';
import setLoggedinprofile from './utils/setLoggedinprofile';




const initialState = {};



const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),reduxFirestore(firebase, fbConfig)));

let currentState = store.getState();

store.subscribe(() => {
  // keep track of the previous and current state to compare changes
  let previousState = currentState;
  currentState = store.getState();
  // if the token changes set the value in localStorage and axios headers
  if (previousState.auth.token !== currentState.auth.token) {
    const token = currentState.auth.token;
    setAuthToken(token);
  }
  if(previousState.profile.currentProfile!==currentState.profile.currentProfile){
    const profileData=currentState.profile.currentProfile;
    setLoggedinprofile(profileData);
  }
});

export default store;