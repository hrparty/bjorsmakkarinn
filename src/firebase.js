import firebase from "firebase/app";
import "firebase/auth";

export default (firebase.apps.length
  ? firebase.app()
  : firebase.initializeApp({
      apiKey: "AIzaSyBI07I7rRw3H8O8sQLQbKbIpW9h83cBPtY",
      authDomain: "bjorsmakkarinn.firebaseapp.com",
      databaseURL: "https://bjorsmakkarinn.firebaseio.com",
      projectId: "bjorsmakkarinn",
      storageBucket: "bjorsmakkarinn.appspot.com",
      messagingSenderId: "733577799153"
    }));
