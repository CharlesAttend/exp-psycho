import { useState, useEffect } from "react";
import { useForm } from'react-hook-form';

const Question = ({id,setCurrentQuestion, onRTUpdate, emotion, setSurvey, handleSubmitButtonClick}) => {
    const QuestionList = [
        Accueil(setCurrentQuestion),
        Survey(setCurrentQuestion,setSurvey),
        ConsigneVideo(setCurrentQuestion, emotion),
        QuestionVideo(setCurrentQuestion,emotion), 
        SurveyVideo(setCurrentQuestion,emotion), 
        ConsigneRTTest(setCurrentQuestion),
        TrialRTTest(setCurrentQuestion),
        QuestionRTTest(setCurrentQuestion,onRTUpdate), 
        FinalQuestion(setCurrentQuestion, handleSubmitButtonClick)];
    return (
        <div>
            {QuestionList[id]}
        </div>
    )
}

const Accueil = (setCurrentQuestion) => (
    <div>
        <div>Merci de participer à mon expérience ! Lisez bien les consignes à chaque étapes et prenez votre temps.</div>
        <div>Le tout prends moins de dix minutes, l'expérience est à faire seule</div>
        <div>N'actualisé pas la page, vous ne pouvez pas retourner en arrière</div>
        <NextQuestionButton setCurrentQuestion={setCurrentQuestion}/>
    </div>
)

const Survey = (setCurrentQuestion, setSurvey) => {
    const { register, handleSubmit } = useForm({
        defaultValues: {
            firstName: "",
            currentMood: 7
        }
    });
    const onSubmit = data => {
        console.log(data);
        setSurvey(data); 
        setCurrentQuestion((prevState) => prevState+1)
    };
    
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>
                    Votre prénom:
                    <input type="text" placeholder="Prénom" {...register('firstName', { required: true })} />
                </label>
                <label>
                    Votre mood actuel
                    <select {...register("currentMood", { required: true })}>
                        {[0,1,2,3,4,5,6,7,8,9,10].map((nb, id)=> 
                            <option value={nb.toString()} key={id}>{nb}</option>
                        )}
                    </select>
                </label>
                <input type="submit" value="Valider 👌"/>
            </form>
        </div>
    )
}

const ConsigneVideo = (setCurrentQuestion, emotion) => {
    const sadVid = <div>Un boxeur est allongé grièvement blessé sur une table, lorsque son petit fils entre.</div>
    const neutralVid = <div>Hannah et Holly font du shopping. Elles parlent d'hier soir.</div>
    return (
        <div>
            <div>Vous allez visionner une courte video, en voici le résumé :</div>
            <div>{emotion==="sad" ? sadVid : neutralVid}</div>

            <div>Restez attentif tout au long de celle-ci.</div>
            <NextQuestionButton setCurrentQuestion={setCurrentQuestion}/>
        </div>
    )
}

const QuestionVideo = (setCurrentQuestion, emotion) => {
    const sadVid = <iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/oxfwLIKTyFk?controls=0" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
    const neutralVid = <iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/Jwm4DPCje1U?controls=0" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
    return (
        <div>
            <div>{emotion==="sad" ? sadVid : neutralVid}</div>
            <NextQuestionButton setCurrentQuestion={setCurrentQuestion}/>
        </div>
    )
}

const SurveyVideo = (setCurrentQuestion, emotion) =>{
    return (
        <div>
        <label>
            Qu'avez vous pensez de la vidéo ? Notez la entre 0 et 10.
            <input type="number"/>
        </label>
        <NextQuestionButton setCurrentQuestion={setCurrentQuestion}/>
    </div>
    )
}

const ConsigneRTTest = (setCurrentQuestion) => (
    <div>
        <div>Vous allez faire un test de temps de réaction</div>
        <div>Lorsque l'arrière plan change de couleur, cliquez n'importe où le plus vite possible</div>
        <div>La prochaine question sera un entraînement d'un essai</div>
        <NextQuestionButton setCurrentQuestion={setCurrentQuestion}/>
    </div>
)
const TrialRTTest = (setCurrentQuestion) => {
    const [RT, setRT] = useState(0);
    const [isFinish, setIsFinish] = useState(false)
    const cl = (RT) => {
        setIsFinish(true);
        setRT(RT);
    }
    const testEndedDiv = <div>
            <div>Votre temps de réaction : {RT}</div>
            <div>Prêt pour le vrais test ? Passez à la question suivante.</div>
            <NextQuestionButton setCurrentQuestion={setCurrentQuestion}/>
        </div>
    return (
        <div>
            {isFinish ? testEndedDiv : <ReactionTimeTest callback={cl}/>}
        </div>
    )
}
const QuestionRTTest = (setCurrentQuestion, onRTUpdate) => {
    const [nbEssai, setNbEssai] = useState(0);
    const cb = (RT) => {
        setNbEssai(prevState => prevState+1);
        onRTUpdate(prevState=>{
            prevState.push(RT)
            return prevState
        });
        console.log("RT:", RT);
    }
    if (nbEssai<50) {
        return <div><ReactionTimeTest key={nbEssai} callback={cb}/></div>
    }
    else {
        return (
            <div>
                <div>Test terminé, allez à la question suivante ;)</div>
                <NextQuestionButton setCurrentQuestion={setCurrentQuestion}/>
            </div>
        )
    }
};

const ReactionTimeTest = ({callback}) => {
    const [compteur, setCompteur] = useState(0);
    const [reaction, setReaction] = useState(false);
    const [timeBefore, setTimeBefore] = useState(0);
    const [intervalID, setIntervalID] = useState(0);
    const [isStarted, setIsStarted] = useState(false);

    useEffect(() => {
        if (!isStarted){
            const interval = setInterval(() => {
                setCompteur(prevCompteur => prevCompteur - 1);
            }, 1000);
            setIntervalID(interval);
            return () => clearInterval(interval);
        }
    }, [compteur, isStarted]);

    useEffect(() =>{
        if (compteur===0){
            clearInterval(intervalID)
            setIsStarted(true);

            const timeToWait = getRandomInt(1000, 3000);
            // setTimeBefore(Date.now());
            const timeoutIntervalID = setTimeout(() => {
                setTimeBefore(performance.now());
                setReaction(true);
            }, timeToWait);
            console.log("TimeBefore", timeBefore, "timeToWait", timeToWait);
            return () => clearInterval(timeoutIntervalID)
        }
    }, [compteur, intervalID])

    return (
        <div>
            {!isStarted && (<div>{compteur}</div>)}
            <div className={reaction ? "h-full bg-red-600" : "h-full bg-gray-400"} onClick={reaction ? ((e) => {callback(performance.now() - timeBefore);}) : undefined }>
                test
            </div>
        </div>
    )
}

const FinalQuestion = (setCurrentQuestion, handleSubmitButtonClick) => (
    <div>
        <div>C'est terminé, merci beaucoup de votre participation !</div>
        <div>Vous pouvez envoyer vos résultats en cliquant sur le bouton</div>
        <button className="text-xl" 
        onClick={(e) => handleSubmitButtonClick()}>
            Envoyer mes résultats ! 
        </button>
    </div>
)

const NextQuestionButton = ({setCurrentQuestion}) => (
    <button className="text-xl" 
        onClick={(e) => setCurrentQuestion((prevState) => prevState + 1)}>
            Question Suivante
    </button>
)

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

export default Question;

