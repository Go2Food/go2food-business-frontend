import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from "./components/pages/Dashboard";
import Messages from "./components/pages/Messages";
import Settings from "./components/pages/Settings";
import FoodOrder from "./components/pages/FoodOrder";
import Favorites from "./components/pages/Favorites";
import Bills from "./components/pages/Bills";
import Invalid from "./components/pages/Invalid";
import History from "./components/pages/History";
import Login from "./components/pages/Login";
import Restaurant from "./components/pages/Restaurants";
import Register from "./components/pages/Register";
import RequireAuthWithNavbar from "./components/wrappers/RequireAuthWithNavbar";
import RequireAuth from "./components/wrappers/RequireAuth";
import NoAuthWithNavbar from "./components/wrappers/NoAuthWithNavbar";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          {/* with navbar*/}
          <Route exact path='/' element={<RequireAuthWithNavbar><Dashboard /></RequireAuthWithNavbar>} />
          <Route exact path='/restaurant/:id' element={<RequireAuthWithNavbar><Restaurant /></RequireAuthWithNavbar>} />
          <Route exact path='/orders' element={<RequireAuthWithNavbar><FoodOrder /></RequireAuthWithNavbar>} />
          <Route exact path='/messages' element={<RequireAuthWithNavbar><Messages /></RequireAuthWithNavbar>} />
          <Route exact path='/settings' element={<RequireAuthWithNavbar><Settings /></RequireAuthWithNavbar>} />
          <Route exact path='/Bills' element={<RequireAuthWithNavbar><Bills /></RequireAuthWithNavbar>} />
          <Route exact path='/favorites' element={<RequireAuthWithNavbar><Favorites /></RequireAuthWithNavbar>} />
          <Route exact path='/history' element={<RequireAuthWithNavbar><History /></RequireAuthWithNavbar>} />

          {/* without navbar */}
          <Route exact path='login' element={<Login />} />
          <Route exact path='register' element={<Register />} />
          <Route exact path='*' element={<Invalid />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;