import { useState } from "react";
const Question = ({id, onRTUpdate, emotion, onMoodUpdate}) => {
    const QuestionList = [Question0,Question1,Question2,Question3, Question4, Question5, Question6];
    return (
        <div>
            {QuestionList[id](emotion, onRTUpdate, onMoodUpdate)}
        </div>
    )
}

const Question0 = () => (
    <div>
        <div>Merci de participer à mon expérience ! Lisez bien les consignes à chaque étapes.</div>
        <div>Le tout prends moins de dix minutes, l'expérience est à faire seule</div>
    </div>
)

const Question1 = (emotion, onRTUpdate, onMoodUpdate) => (
    <div>
        Test sur votre mood actuelle 
    </div>
)

const Question2 = () => (
    <div>
        <div>Vous allez visionner une courte video</div>
        <div>Restez attentif tout au long de la vidéo</div>
    </div>
)

const Question3 = (emotion, onRTUpdate, onMoodUpdate) => {
    const sadVid = <iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/oxfwLIKTyFk?controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    const neutralVid = <div>neutral vid</div>
    return (<div>
        {emotion==="sad" ? sadVid : neutralVid} 
    </div>)
}

const Question4 = () =>{
    return (
        <div>jes suis une fct</div>
    )
}

const Question5 = (emotion, onRTUpdate, onMoodUpdate) => {
    const [nbEssai, setNbEssai] = useState(0);
    const [RTList, setRTList] = useState([])
    const cb = (RT) => {
        setNbEssai(nbEssai+1);
        setRTList(prevState=>{
            prevState.push(RT)
            return prevState
        });
    }
    if (nbEssai<5) {
        // return <ReactionTimeTest callback={cb}/>
        console.log(RTList);
        return <div onClick={()=>cb(14)}><ReactionTimeTest callback={cb}/></div>
    }
    else {
        onRTUpdate(RTList)
        return <div>Test terminé, allez à la question suivante ;)</div>
    }
};

const ReactionTimeTest = ({callback}) => {
    const [isStarted, setIsStarted] = useState(false);
    const [compteur, setCompteur] = useState(5);
    const [reaction, setReaction] = useState(false);
    const [timeAfter, setTimeAfter] = useState(0);
    let
    

    if(compteur != 0){
        let intervalID = setInterval(() => {
            setCompteur(compteur-1)
        }, 1000);
    }
    else {
        clearInterval(intervalID);
        setCompteur(5);
        const timeToWait = getRandomInt(1000, 3000);
        const timeBefore = Date.now();
        setTimeout(() => {
            setReaction(true)
            // setCompteur(5)
            setIsStarted(true)
        }, timeToWait);
    }

    return (
        <div>
            {!isStarted && (<div>{compteur}</div>)}
            <div className={reaction ? "h-full bg-red-600" : "h-full bg-gray-400"} onClick={reaction ? () => setTimeAfter(Date.now()): 0}>
                test
            </div>
        </div>
    )
}

const Question6 = () => (
    <div>
        <div>Félicitation pd</div>
    </div>
)



function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

export default Question;

