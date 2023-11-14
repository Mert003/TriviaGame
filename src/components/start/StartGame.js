import React, { useState, useEffect } from 'react';
import { useNavigate} from "react-router-dom";
 import axios from 'axios';
 import "./start.css";
import Select from 'react-select';
import gamePic from "./game.png";

export default function StartGame() {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const navigate=useNavigate();
  
    useEffect(() => {
      axios.get('https://opentdb.com/api_category.php')
        .then(response => {
          setCategories(response.data.trivia_categories.map(category => ({
            value: category.id,
            label: category.name
          })));
        })
        .catch(error => console.error(error));
    }, []);
  
    const handleStart = () => {
      navigate("/game?category="+selectedCategory.value);
    };
  
    const handleCategoryChange = category => {
      setSelectedCategory(category);
    };
  
    return (

      <div className='startContainer'>
        <div className='mainContainer'>
        <img src={gamePic} className="startGamePic"/>
        <h1>Trivia App</h1>
        <label>Select a category:</label>
        <Select
          options={categories}
          value={selectedCategory}
          onChange={handleCategoryChange}
          className='selectCategory'
        />
       <button onClick={handleStart}>Start</button>
       </div>
      </div>
    );
  }
  