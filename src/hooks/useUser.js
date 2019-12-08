import { useState } from "react";
import firebase from "../firebase";

export default function useUser() {
  const [user, setUser] = useState(null);

  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      setUser(user);
    }
  });

  return user;
}
