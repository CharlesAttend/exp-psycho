import React, { useState } from 'react';
import Question from './questionBank'


function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [startingMood, setStartingMood] = useState("")
  const [RTList, setRTList] = useState([]);
  const [totalQuestion, setTotalQuestion] = useState(6);
  const [emotion, setEmotion] = useState(choose(['sad', 'neutral']))
  console.log(emotion);

  const handleAnswerButtonClick = (answerOption) => {
    if(currentQuestion===totalQuestion){
      //do web request
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reaction_time: RTList, emotion: emotion, startingMood: startingMood})
      };
      fetch('https://621bb200768a4e10209a9b6e.mockapi.io/result', requestOptions)
      .then(response => response.json())
      .then(data => console.log("worked", data));
      return 0;
    }
    const nextQuestion = currentQuestion + 1;
    setCurrentQuestion(nextQuestion);
  };
  
  return (
    <div className="App">
      <div>Question {currentQuestion} sur {totalQuestion}</div>
      <Question className="h-10" id={currentQuestion} onRTUpdate={setRTList} emotion={emotion} onMoodUpdate={setStartingMood}/>
      <button className="text-xl" onClick={() => handleAnswerButtonClick()}>Question Suivante</button>
    </div>
  );
}

function choose(choices) {
  var index = Math.floor(Math.random() * choices.length);
  return choices[index];
}

export default App;
