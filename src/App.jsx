import React, { useState, useEffect} from 'react';
import Question from './questionBank'
import './App.css'

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [survey, setSurvey] = useState("")
  const [surveyAfter, setSurveyAfter] = useState("")
  const [RTList, setRTList] = useState([]);
  const [totalQuestion, _setTotalQuestion] = useState(8);
  const [emotion, setEmotion] = useState("sad");
  // const [nbSad, setNbSad] = useState(0);
  // const [nbNeutral, setNbNeutral] = useState(0);

  const setEmotionFromNumber = (nbNeutral, nbSad) => {
    console.log(nbNeutral, nbSad);
    if(nbNeutral<nbSad){
      setEmotion("neutral");
      console.log("neutral");
    }
    else {
      setEmotion("sad");
      console.log("sad");
    }
  }

  const handleSubmitButtonClick = (cb) => {
    postResult(cb);
    deleteAndUpdateGroupsNumber();
  };
  
  const postResult = (cb) => {
    let body = {
      survey: {...survey, ...surveyAfter},
      emotion: emotion,
      reaction_time: RTList 
    };
    console.log(body);
    let requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    };
    fetch('https://621bb200768a4e10209a9b6e.mockapi.io/result', requestOptions)
    .then(response => response.json())
    .then(data => cb());
  }

  const getEmotionNumber = () => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify()
    };

    return fetch('https://621bb200768a4e10209a9b6e.mockapi.io/groups', requestOptions)
      .then(response => response.json())
  }

  const deleteAndUpdateGroupsNumber = () => {
    getEmotionNumber().then(
      (data) => {
        let nbSad = data[0].sad;
        let nbNeutral = data[0].neutral;

        if(emotion === "sad"){
          nbSad = nbSad + 1;
        }
        else{
          nbNeutral = nbNeutral + 1;
        }

        const requestOptions = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sad: nbSad,
            neutral: nbNeutral,
          })
        }
        fetch('https://621bb200768a4e10209a9b6e.mockapi.io/groups/1', requestOptions)      
          .then(response => response.json())
          .then(data => {
            console.log("worked", data);
        })
      }
    );
  }

  useEffect(() => {
    getEmotionNumber().then(data => setEmotionFromNumber(data[0].neutral, data[0].sad))
  }, [])
  
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

export default App;
