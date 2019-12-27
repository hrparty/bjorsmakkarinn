import { useState } from "react";
import firebase from "../firebase";

export default function useUser() {
  const [loaded, setLoaded] = useState(false);
  const [user, setUser] = useState(null);

  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      setUser(user);
    }
    setLoaded(true);
  });

  return [loaded, user];
}
