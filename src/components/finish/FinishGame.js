import React from "react";
import { useLocation , useNavigate } from 'react-router-dom';
import "./finishgame.css";
import gameoverpicture from "./gameover.png";
export default function FinishGame(){
    const location=useLocation();
    const queryParams=new URLSearchParams(location.search);
    const score=queryParams.get("score");

    const navigate=useNavigate();
    function handleClick(){
        navigate("/");
    }
    return(
        <div className="finishGameContainer">
            <img src={gameoverpicture} className="gameoverpicture" />
            <h2 className="correctanswers">YOU GAVE {score} CORRECT ANSWERS</h2>
            <button onClick={handleClick} className="playagain">PLAY AGAIN</button>
        </div>
    )
}