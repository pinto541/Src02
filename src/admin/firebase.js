import { initializeApp ,getApp ,getApps } from "firebase/app";
import {getAuth } from 'firebase/auth'
import {getStorage} from 'firebase/storage'
import {getFirestore} from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyDbkFO4F2Y9D7Cjw0iVn4xMKc-pOYfv88c",
  authDomain: "pinto-shop.firebaseapp.com",
  projectId: "pinto-shop",
  storageBucket: "pinto-shop.appspot.com",
  messagingSenderId: "859933933787",
  appId: "1:859933933787:web:903bfd3943df8465edccfe"
};

// Initialize Firebase
//const app = initializeApp(firebaseConfig);

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()

const auth = getAuth(app)
const db = getFirestore(app)
const  storage = getStorage(app)

export {auth ,db ,storage}