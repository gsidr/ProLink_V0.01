import * as firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
import "firebase/auth";


// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAIgwKiWls3ESFLq8XDpMu5D14BhPAPjWA",
  authDomain: "socialmediaapp14.firebaseapp.com",
  databaseURL: "https://socialmediaapp14.firebaseio.com",
  projectId: "socialmediaapp14",
  storageBucket: "socialmediaapp14.appspot.com",
  messagingSenderId: "954746037105",
  appId: "1:954746037105:web:60602c7c1e2e07a62c8cd0",
  measurementId: "G-LMH0KYG46X"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

  // Initialize Firebase
  
  //firebase.analytics();

  firebase.firestore().settings({});


  // const projectStorage=firebase.storage();
  // const projectFirestore=firebase.firestore();
  // const timeStamp=firebase.firestore.FieldValue.serverTimestamp;
  
  
  
  

  export default firebase;