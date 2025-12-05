import React from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./Nav";
import ManageCar from "./ManagerCar.jsx";
import Home from "./Home.jsx";
import Simulador from "./Simulator.jsx";
import "./App.css";

export default function App() {
  return (
    <main className="p-4">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/manage" element={<ManageCar />} />
        <Route path="/simulador" element={<Simulador />} />
      </Routes>
    </main>
  );
}
