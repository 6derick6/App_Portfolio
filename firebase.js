import * as firebase from 'firebase';
import 'firebase/firestore';

const firebaseApp = firebase.initializeApp({  
  apiKey: "AIzaSyA4Xo0rgyVzp6qAXAA0aZdsdveubPOBJXQ",
  authDomain: "portfolioapp-af5c5.firebaseapp.com",
  projectId: "portfolioapp-af5c5",
  storageBucket: "portfolioapp-af5c5.appspot.com",
  messagingSenderId: "999536184716",
  appId: "1:999536184716:web:9dca71a320434f3d845aa9"
});

const db = firebase.firestore();

export {db};