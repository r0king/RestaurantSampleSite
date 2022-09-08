import './App.css'
import Login from './components/Login'
import Home from './components/DashBoard'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from './components/Admin';
import Add from './components/Add';
import Main from './components/Main';
import Special from './components/Special';
import Rating from './components/Rating';
import {app} from './firebase';
import db from './firebase';
import {onAuthStateChanged, getAuth} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const auth = getAuth(app);

onAuthStateChanged(auth, async (user) => {
  if (! user && window.location.pathname != '/login') {
    window.location.pathname = '/login'
  } 
  else if(user && window.location.pathname == '/login'){
    window.location.pathname = '/'
  }
  else if(user && window.location.pathname == '/admin'){
    const docRef = doc(db, "Users", "Admin");
    const docSnap = await getDoc(docRef);    
    if (! docSnap.data().manager.includes(user.email)){      
          window.location.pathname = '/'
    }
  }
  // console.log(user)
});

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="admin" element={<Admin />} />
        <Route path="addItem" element={<Add />} />
        <Route path="main" element={<Main />} />
        <Route path="special" element={<Special />} />
        <Route path="rating" element={<Rating />} />
      </Routes>
    </BrowserRouter>
  )
}