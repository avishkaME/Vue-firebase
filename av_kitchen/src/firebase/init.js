import firebase from 'firebase'
import firestore from 'firebase/firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAeRxwvo8GU_gN55N4ZaK0SsxSxOZszxe8",
    authDomain: "avi-s-kitchen.firebaseapp.com",
    databaseURL: "https://avi-s-kitchen.firebaseio.com",
    projectId: "avi-s-kitchen",
    storageBucket: "avi-s-kitchen.appspot.com",
    messagingSenderId: "178633111357",
    appId: "1:178633111357:web:266b28d8b1983684a63754",
    measurementId: "G-WM6NZJN0VF"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
firebaseApp.firestore().settings({ timestampsInSnapshots: true})
firebase.analytics();

//export firestore database
export default firebaseApp.firestore()