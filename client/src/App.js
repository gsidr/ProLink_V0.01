import React, { Fragment, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Routes from "./components/routing/Routes";
// import Chat from "./components/chat/Chat";
import ChatWindow from "./components/chat/ChatWindow"


//redux
import { Provider } from "react-redux";
import store from './store';
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
// import { ReactReduxFirebaseProvider } from "react-redux-firebase";
// import {
//   createFirestoreInstance,
// } from "redux-firestore";
// import firebase from "firebase/app";




// const rrfConfig = {
//   userProfile: 'users',
//   useFirestoreForProfile: true
// }


// const rrfProps = {
//   firebase,
//   config: rrfConfig,
//   dispatch: store.dispatch,
//   createFirestoreInstance,
//   presence: 'presence',
//   sessions: 'sessions'
// };

const App = () => {

  if (localStorage.token) {
    setAuthToken(localStorage.token);

  }

  useEffect(() => { store.dispatch(loadUser()) }, []);//Passing empty array in use effect will run the
  //hook only once per each mount/unmount     




  return (
    <Provider store={store}>
      {/* <ReactReduxFirebaseProvider {...rrfProps}> */}

      <Router>

        <Fragment> <Navbar /> <ChatWindow />

          <Switch>
            <Route exact path="/" component={Landing} />
            <Route component={Routes} />
          </Switch>



        </Fragment>
      </Router>
      {/* </ReactReduxFirebaseProvider> */}
    </Provider>
  )
};




export default App;
