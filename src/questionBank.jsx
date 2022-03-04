import { useState, useEffect } from "react";
import { useForm } from'react-hook-form';

const Question = ({id, onRTUpdate, emotion, onMoodUpdate}) => {
    const QuestionList = [
        Question0(),
        Question1(onMoodUpdate),
        Question2(),
        Question3(emotion), 
        Question4(), 
        Question5(onRTUpdate), 
        Question6];
    return (
        <div>
            {QuestionList[id]}
        </div>
    )
}

const Question0 = () => (
    <div>
        <div>Merci de participer à mon expérience ! Lisez bien les consignes à chaque étapes.</div>
        <div>Le tout prends moins de dix minutes, l'expérience est à faire seule</div>
        <div>N'actualisé pas la page, vous ne pouvez pas retourner en arrière</div>
    </div>
)

const Question1 = (onMoodUpdate) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>
                    Votre prénom:
                    <input type="text" defaultValue="Prénom" {...register('firstName', { required: true })} />
                </label>
                <label htmlFor="">
                    Votre mood actuel
                    <input type="range" name="name" {...register('mood', { required: true, min: 0, max: 10 })}></input>
                </label>
                {errors.exampleRequired && <span>This field is required</span>}
                <input type="submit"/>
            </form>
        </div>
    )
}

const Question2 = () => (
    <div>
        <div>Vous allez visionner une courte video</div>
        <div>Restez attentif tout au long de la vidéo</div>
    </div>
)

const Question3 = (emotion) => {
    const sadVid = <iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/oxfwLIKTyFk?controls=0" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
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

const Question5 = (onRTUpdate) => {
    const [nbEssai, setNbEssai] = useState(0);
    const cb = (RT) => {
        setNbEssai(prevState => prevState+1);
        onRTUpdate(prevState=>{
            prevState.push(RT)
            return prevState
        });
        console.log("Callback:", RT);
    }
    if (nbEssai<5) {
        return <div><ReactionTimeTest key={nbEssai} callback={cb}/></div>
    }
    else {
        return <div>Test terminé, allez à la question suivante ;)</div>
    }
};

const ReactionTimeTest = ({callback}) => {
    const [compteur, setCompteur] = useState(3);
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
            console.log(intervalID);
            clearInterval(intervalID)
            setIsStarted(true);

            const timeToWait = getRandomInt(1000, 3000);
            setTimeBefore(Date.now());
            setTimeout(() => {
                setReaction(true);
            }, timeToWait);
        }
    }, [compteur, intervalID])

    return (
        <div>
            {!isStarted && (<div>{compteur}</div>)}
            <div className={reaction ? "h-full bg-red-600" : "h-full bg-gray-400"} onClick={reaction ? ((e) => {callback(Date.now() - timeBefore);}) : undefined }>
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

