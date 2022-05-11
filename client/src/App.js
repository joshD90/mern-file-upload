//most of the action is going on inside this react app.  This should
//be modularised in the future

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//import components
import HomePage from "./components/HomePage";
import CreateProfile from "./components/CreateProfile";
import FindProfile from "./components/FindProfile";
import Tester from "./components/Tester";
import NavBar from "./components/NavBar";
import SearchProfile from "./components/SearchProfile";
import UpdateProfile from "./components/UpdateProfile";
//use the app component to only hold the routes.  Routes are used through
//react router dom.
function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreateProfile />} />
        <Route path="/profile" element={<FindProfile />} />
        <Route path="/search" element={<SearchProfile />} />
        <Route path="/test" element={<Tester />} />
        <Route path="/profile/update/:id" element={<UpdateProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
