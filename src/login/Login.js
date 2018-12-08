import React from "react";
import firebase from "firebase/app";
import firebaseui from "firebaseui";
import "firebase/auth";
import "firebaseui/dist/firebaseui.css";

const Login = () => {
  const config = {
    signInSuccessUrl: window.location.origin,
    signInOptions: [
      {
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        requireDisplayName: false
      },
      firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ]
  };

  const ui = new firebaseui.auth.AuthUI(firebase.auth());

  // The start method will wait until the DOM is loaded
  ui.start("#firebaseui-auth-container", config);

  return <div id="firebaseui-auth-container" />;
};

export default Login;
