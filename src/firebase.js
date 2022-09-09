import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAs1Q9Qf5hSewyYzipzpu1_HnN4o9nwn3Y",
    authDomain: "instagram-clone-9244a.firebaseapp.com",
    projectId: "instagram-clone-9244a",
    storageBucket: "instagram-clone-9244a.appspot.com",
    messagingSenderId: "704974770798",
    appId: "1:704974770798:web:531c9eb25ac0d8dc40cc7f",
    measurementId: "G-R3D7NLQ7QK"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };