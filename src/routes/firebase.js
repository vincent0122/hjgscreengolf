import firebase from "firebase/app";
const functions = require("firebase-functions");

const firebaseConfig_hard = {
	apiKey: "AIzaSyBqDOnWC0jx7BZGdf37fyNu2ymmkU-SlXg",
	authDomain: "hjggolf-3e695.firebaseapp.com",
	projectId: "hjggolf-3e695",
	storageBucket: "hjggolf-3e695.appspot.com",
	messagingSenderId: "381996984553",
	appId: "1:381996984553:web:90ddda8c5a597b7ac36878",
};

export default firebase.initializeApp(firebaseConfig_hard);
