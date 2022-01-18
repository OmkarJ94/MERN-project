import React, { createContext, useReducer } from 'react'
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";
import About from './components/About';
import Login from './components/Login';
import Signup from './components/Signup';
import Contact from './components/Contact';
import Error from './components/Error';
import Logout from './components/Logout';
import { reducer } from "./reducer/useReducer"
import Changepassword from './components/Changepassword';
// import Changepassword from './components/Changepassword';

export const UserContext = createContext()
const App = () => {

  const [state, dispatch] = useReducer(reducer, false)
  return (
    <>
      <UserContext.Provider value={{ state, dispatch }}>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/logout" element={<Logout />} />
          <Route exact path="/Changepassword" element={<Changepassword />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </UserContext.Provider>
    </>
  )
}

export default App
