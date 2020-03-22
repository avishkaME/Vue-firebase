import firebase from 'firebase'
import firestore from 'firebase/firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBwjOke9IM-KDMF18_X_YqK54XO8Prqt48",
    authDomain: "geo-pals.firebaseapp.com",
    databaseURL: "https://geo-pals.firebaseio.com",
    projectId: "geo-pals",
    storageBucket: "geo-pals.appspot.com",
    messagingSenderId: "1072534309599",
    appId: "1:1072534309599:web:9f5ab2ef40fb9b34d6376a",
    measurementId: "G-W40M210MY0"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp.firestore()
firebase.analytics();