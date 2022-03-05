import React, { useState } from 'react';
import Question from './questionBank'


function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [survey, setSurvey] = useState("")
  const [RTList, setRTList] = useState([]);
  const [totalQuestion, _setTotalQuestion] = useState(8);
  const [emotion, _setEmotion] = useState(choose(['sad', 'neutral']))
  console.log(emotion);

  const handleSubmitButtonClick = () => {
      //do web request
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ survey: survey, emotion: emotion, reaction_time: RTList })
      };
      fetch('https://621bb200768a4e10209a9b6e.mockapi.io/result', requestOptions)
      .then(response => response.json())
      .then(data => console.log("worked", data));
  };
  
  return (
    <div className="App">
      <div>Question {currentQuestion} sur {totalQuestion}</div>
      <Question className="h-10" id={currentQuestion} 
        onRTUpdate={setRTList}
        emotion={emotion}
        setSurvey={setSurvey}
        setCurrentQuestion={setCurrentQuestion}
        handleSubmitButtonClick={handleSubmitButtonClick}
      />
    </div>
  );
}

function choose(choices) {
  var index = Math.floor(Math.random() * choices.length);
  return choices[index];
}

export default App;
