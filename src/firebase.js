import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBCztUTmKwXkRcWD9-E6suAP9nD1jlg404",
  authDomain: "royal-restaurent.firebaseapp.com",
  projectId: "royal-restaurent",
  storageBucket: "royal-restaurent.appspot.com",
  messagingSenderId: "439941612104",
  appId: "1:439941612104:web:0e578cf198201b53774e7d",
  measurementId: "G-HZNG0D8VFD"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
export {app};