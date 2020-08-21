import firebase from "./config"

const projectStorage=firebase.storage();
const projectFirestore=firebase.firestore();
const timeStamp=firebase.firestore.FieldValue.serverTimestamp;
const addElement=firebase.firestore.FieldValue.arrayUnion;

export  {projectStorage,projectFirestore,timeStamp,addElement};