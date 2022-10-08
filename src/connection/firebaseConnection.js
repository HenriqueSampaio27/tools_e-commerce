import {initializeApp} from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyA93vvOZpjR8b0ORoN2JsJC3ne5fZ8y3Ts",
  authDomain: "e-commerce-ferramentas.firebaseapp.com",
  databaseURL: "https://e-commerce-ferramentas-default-rtdb.firebaseio.com",
  projectId: "e-commerce-ferramentas",
  storageBucket: "e-commerce-ferramentas.appspot.com",
  messagingSenderId: "134572424802",
  appId: "1:134572424802:web:60bba66a246bec9e5fdb3b"
};

export const firebase = initializeApp(firebaseConfig);
const db = getFirestore(firebase)

export default db