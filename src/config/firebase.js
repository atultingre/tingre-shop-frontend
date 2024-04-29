import firebase from "firebase/compat/app";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC_mT4vcBFPNern3lDcQ1HeVK0ivVl1o88",
  authDomain: "tingre-shop.firebaseapp.com",
  projectId: "tingre-shop",
  storageBucket: "tingre-shop.appspot.com",
  messagingSenderId: "353854753867",
  appId: "1:353854753867:web:89b0af6c9eb91ca60e91ce",
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
