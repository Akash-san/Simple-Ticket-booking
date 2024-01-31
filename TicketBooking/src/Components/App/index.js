

import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "../Header/header";
import Homepage from "../Homepage/homePage";
import BookSeats from "../BookSeats/bookSeats";
import Sessions from "../Sessions/sessions";
import Login from "./../../Components/Auth/Login";
import Signup from "./../Auth/Signup";
import "./../../assets/css/reset.css";
import "./../../assets/css/style.css";

function App() {
  const [movie, setMovie] = useState({});
  const [home, setHome] = useState(true);

  return (
    <BrowserRouter>
      <Header home={home} />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route
          path="/login"
          element={<Login setHome={setHome} />}
        />
        <Route
          path="/signup"
          element={<Signup setHome={setHome} />}
        />
        <Route
          path="/home"
          element={<Homepage home={home} setHome={setHome} />}
        />
        <Route
          path="/movie/:idMovie"
          element={<Sessions home={home} setHome={setHome} />}
        />
        <Route
          path="/session/:idSession"
          element={
            <BookSeats
              movie={movie}
              setMovie={setMovie}
              home={home}
              setHome={setHome}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

