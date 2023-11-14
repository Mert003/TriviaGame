import React from "react";
import StartGame from "./components/start/StartGame";
import Game from "./components/game/Game";
import Finish from "./components/finish/FinishGame";
import {Routes,Route} from "react-router-dom"
function App() {
  
 
  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<StartGame />} />
      <Route path="/game" element={<Game />} />
      <Route path="/finish" element={<Finish />} />
      </Routes>
    </div>
  );
}

export default App;
