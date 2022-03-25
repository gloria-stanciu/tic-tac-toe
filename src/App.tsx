import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Gameboard from "./components/Gameboard";

function App() {
  return (
    <div id='App' className="w-screen h-screen flex flex-col justify-evenly items-center">
      <h1
        className="text-lg text-slate-800 my-8
      sm:text-xl
      md:text-2xl
      lg:text-3xl
      xl:text-4xl
      "
      >
        Let's play tic-tac-toe!
      </h1>
      <Gameboard size={3} />
    </div>
  );
}

export default App;
