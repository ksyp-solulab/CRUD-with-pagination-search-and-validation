import {useDispatch } from "react-redux";
import{ useEffect } from "react";


import Home from './pages/Home';
import { getUsers } from './redux/userSlice'

import './App.css';


function App() {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getUsers())
  })
  return (
    <div className="App">
        <Home />
    </div>
  );
}

export default App;
