import './App.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useState } from 'react';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
function App() {
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const facebookProvider = new firebase.auth.FacebookAuthProvider();
  const githubProvider = new firebase.auth.GithubAuthProvider();
  const [user, setUser] = useState({})
  const [fbUser, setFbUser] = useState({})

  const handleGoogleSignIn = () => {
    firebase.auth()
      .signInWithPopup(googleProvider)
      .then((result) => {
        var user = result.user;
        // console.log(user)
        setUser(user)
        // ...
      }).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        console.log(errorCode, errorMessage, email)
        // ...
      });
  }

  const handleFbSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(facebookProvider)
      .then((result) => {
        var credential = result.credential;
        var user = result.user;
        console.log(user)
        setFbUser(fbUser)

        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        console.log(errorMessage, errorCode, email)
        // ...
      });
  }

  const handleGithubSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(githubProvider)
      .then((result) => {
        var user = result.user;
        setUser(user)
        // ...
      }).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        console.log(errorCode, errorMessage, email)
        // ...
      });
  }


  return (
    <div className="App">
      <button onClick={handleGoogleSignIn}>Sign in With Google</button>
      <h1>Name: {user.displayName}</h1>
      <h2>Email: {user.email}</h2>
      <img src={user.photoURL} alt="" />
      <button onClick={handleFbSignIn}>Sign in With Facebook</button>
      <h1>Name: {fbUser.displayName}</h1>
      <h2>Email: {fbUser.email}</h2>
      <img src={fbUser.photoURL} alt="" />
      <button onClick={handleGithubSignIn}>Sign in With Github</button>
    </div>
  );
}

export default App;
