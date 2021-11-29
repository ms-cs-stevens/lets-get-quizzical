import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import "firebase/compat/auth";
import { firebaseConfig } from "../config";

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp;
