import React, { useState } from 'react';
import Question from './questionBank'
import './App.css'

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [survey, setSurvey] = useState("")
  const [surveyAfter, setSurveyAfter] = useState("")
  const [RTList, setRTList] = useState([]);
  const [totalQuestion, _setTotalQuestion] = useState(8);
  const [emotion, _setEmotion] = useState(choose(['sad', 'neutral']))
  console.log(emotion);

  const handleSubmitButtonClick = (cb) => {
      //do web request
      const body = {
        survey: {...survey, ...surveyAfter},
        emotion: emotion,
        reaction_time: RTList 
      };
      console.log(body);
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      };
      fetch('https://621bb200768a4e10209a9b6e.mockapi.io/result', requestOptions)
      .then(response => response.json())
      .then(data => cb("Ca a marché ! ✔️"));
  };
  
  return (
    <div className="h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className='bg-white shadow-xl p-7 h-3/4 w-full flex flex-col items-center justify-between'>
      <Question id={currentQuestion} 
        onRTUpdate={setRTList}
        emotion={emotion}
        setSurvey={setSurvey}
        setCurrentQuestion={setCurrentQuestion}
        handleSubmitButtonClick={handleSubmitButtonClick}
        setSurveyAfter={setSurveyAfter}
        />
        <div className='my-2'>Question {currentQuestion} sur {totalQuestion}</div>
      </div>
    </div>
  );
}

const choose = (choices) => {
  let index = Math.floor(Math.random() * choices.length);
  return choices[index];
}

export default App;
