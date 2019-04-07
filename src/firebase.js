import firebase from "firebase/app";
import "firebase/database";

export var app = firebase.initializeApp({
  apiKey: "AIzaSyBZDWC2z_exx4XaIPHHhC1J3Mt7GwQQ-bA",
  authDomain: "gg123-3f035.firebaseapp.com",
  databaseURL: "https://gg123-3f035.firebaseio.com",
  projectId: "gg123-3f035",
  storageBucket: "gg123-3f035.appspot.com",
  messagingSenderId: "795816707190"
});

export const time = firebase.database.ServerValue.TIMESTAMP;
export const db = app.database();