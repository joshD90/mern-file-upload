//most of the action is going on inside this react app.  This should
//be modularised in the future

import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//import components
import CreateProfile from "./components/CreateProfile";
import FindProfile from "./components/FindProfile";
import Tester from "./components/Tester";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/create" element={<CreateProfile />} />
        <Route path="/profile/:profileName" element={<FindProfile />} />
        <Route path="/test" element={<Tester />} />
      </Routes>
    </Router>
  );
}

export default App;
