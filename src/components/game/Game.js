import React, { useState, useEffect } from "react";
import {useNavigate , useLocation} from "react-router-dom"
import "./game.css";
import game from "./game.jpg";
export default function Game() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  const location=useLocation();
  const queryParams=new URLSearchParams(location.search);
  const category=queryParams.get("category");

  const getQuestions = async (categoryId) => {
    const response = await fetch(
      `https://opentdb.com/api.php?amount=10&category=${categoryId}&type=multiple`
    );
    const data = await response.json();
    setQuestions(data.results);
  };

  useEffect(() => {
   
    getQuestions(category); // category ID 
  }, []);
  
  
  const navigate=useNavigate();

  const handleAnswer = (answer) => {
    const isCorrect = answer === questions[currentQuestion].correct_answer;
    if (isCorrect) {
      setScore(score + 1);
    }
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      /*setCurrentQuestion(0);
      setScore(0);*/
      navigate(`/finish?score=${score}`);
     
    }
  };

  const shuffleAnswers = (answers) => {
    for (let i = answers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [answers[i], answers[j]] = [answers[j], answers[i]];
    }
    return answers;
  };
 
  return (
    <div className="GameContainer">
      <img src={game} className="boardPicture"/>
      {questions.length > 0 ? (
        <>
        <h2 >{currentQuestion+1}. Question</h2>
          <h2 dangerouslySetInnerHTML={{ __html: questions[currentQuestion].question }} className="GameQuestion" /> 
          {shuffleAnswers([
            questions[currentQuestion].correct_answer,
            ...questions[currentQuestion].incorrect_answers,
          ]).map((answer, index) => (
            <button key={index} onClick={() => handleAnswer(answer)} className="GameOptions">
              {answer}
            </button>
          ))}
          <h2 >Your score : {score}</h2>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
