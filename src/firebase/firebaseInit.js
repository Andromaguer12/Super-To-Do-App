import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import "firebase/database";
import "firebase/analytics";

export const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyABSxYF4rcedlea7elcSNft3ghDUAOaw-o",
  authDomain: "to-do-app-619d7.firebaseapp.com",
  projectId: "to-do-app-619d7",
  storageBucket: "to-do-app-619d7.appspot.com",
  messagingSenderId: "579302414310",
  appId: "1:579302414310:web:458730b988950b37baa827",
});

export const auth = firebase.auth();

export const analytics = firebase.analytics();

export const storage = firebase.storage();

export const rdb = firebase.database();

let db = firebase.firestore();

db.settings({ timestampsInSnapshots: true });

export const googleProvider = new firebase.auth.GoogleAuthProvider();

export const usersRef = db.collection("UsuariosData");

export default db;
