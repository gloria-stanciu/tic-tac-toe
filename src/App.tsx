import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Gameboard from "./components/Gameboard";

function App() {
  return (
    <div className="App">
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
      <button
        className="bg-white py-4 px-6 rounded-md
      hover:bg-slate-300 hover:font-medium "
      >
        Restart game
      </button>
    </div>
  );
}

export default App;
