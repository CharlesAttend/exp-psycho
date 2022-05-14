import { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import fig_circumplex from './figure_circumplex_model.png'

const Question = ({ id, setCurrentQuestion, onRTUpdate, emotion, setSurvey, handleSubmitButtonClick, setSurveyAfter }) => {
    const QuestionList = [
        Accueil(setCurrentQuestion),
        Survey(setCurrentQuestion, setSurvey),
        ConsigneVideo(setCurrentQuestion, emotion),
        QuestionVideo(setCurrentQuestion, emotion),
        SurveyVideo(setCurrentQuestion, setSurveyAfter),
        ConsigneRTTest(setCurrentQuestion),
        TrialRTTest(setCurrentQuestion),
        QuestionRTTest(setCurrentQuestion, onRTUpdate),
        FinalQuestion(setCurrentQuestion, handleSubmitButtonClick)];
    return (
        <div className="h-full w-full text-lg text-center">
            {QuestionList[id]}
        </div>
    )
}

const Accueil = (setCurrentQuestion) => (
    <div className="h-full flex flex-col justify-between items-center">
        <div>
            <div>Merci de participer à mon expérience ! </div>
            <div className="font-bold">Lisez bien les consignes à chaque étape et prenez votre temps.</div>
            <div>Le tout prend moins de cinq minutes, l'expérience est à faire seule, dans un endroit calme</div>
            <div>N'actualisez pas la page, vous ne pouvez pas retourner en arrière</div>
        </div>
        <NextQuestionButton setCurrentQuestion={setCurrentQuestion} />
    </div>
)

const Survey = (setCurrentQuestion, setSurvey) => {
    const { register, handleSubmit } = useForm({
        defaultValues: {
            firstName: "",
            age: 0,
            moodBefore: 0,
            sexe: ""
        }
    });
    const onSubmit = data => {
        console.log(data);
        // vérifier les inputs numériques
        setSurvey(data);
        setCurrentQuestion((prevState) => prevState + 1)
    };

    return (
        <div className="flex flex-col lg:flex-row h-full sm:ml-10">
            <form className="flex flex-col items-start" onSubmit={handleSubmit(onSubmit)}>
                <label>
                    Votre prénom :
                    <input className="ml-2" type="text" placeholder="Prénom" {...register('firstName', { required: true })} />
                </label>
                <label>
                    Votre âge :
                    <input className="ml-2" type="number" placeholder="0" {...register('age', { required: true })} />
                </label>
                <label>
                    Votre sexe :
                    <select className="ml-2" {...register("sexe", { required: true })}>
                        {["Homme", "Femme"].map((txt, id)=> 
                            <option value={txt} key={id}>{txt}</option>
                        )}
                    </select>
                </label>
                <label>
                    <div className="text-left">
                        Entrez le numéros de la case de la grille qui correspond le mieux à votre état émotionnel actuel :
                        <input className="ml-2" type="number" placeholder="Numéros case grille" {...register('moodBefore', { required: true })} />
                    </div>
                </label>
                <input className="mt-7 self-center text-xl p-2 border-2 rounded-md hover:bg-gray-50" type="submit" value="Valider 👌" />
            </form>
            <img src={fig_circumplex} className="my-2 object-scale-down h-full lg:h-5/6" alt="" />
        </div>
    )
}

const ConsigneVideo = (setCurrentQuestion, emotion) => {
    const sadVid = <div className="border rounded-md bg-gray-50 text-center">Un boxeur est allongé grièvement blessé sur une table, lorsque son petit fils entre.</div>
    const neutralVid = <div className="border rounded-md bg-gray-50 text-center">Hannah et Holly font du shopping. Elles parlent d'hier soir.</div>
    return (
        <div className="h-full flex flex-col justify-between items-center">
            <div>
                <div>Vous allez visionner une courte vidéo, en voici le résumé :</div>
                <div>{emotion === "sad" ? sadVid : neutralVid}</div>
            </div>
            <div>Restez attentif et regardez la vidéo en entier.</div>
            <NextQuestionButton setCurrentQuestion={setCurrentQuestion} />
        </div>
    )
}

const QuestionVideo = (setCurrentQuestion, emotion) => {
    const sadVid = <iframe src="https://www.youtube-nocookie.com/embed/oxfwLIKTyFk?controls=1" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
    const neutralVid = <iframe src="https://www.youtube-nocookie.com/embed/Jwm4DPCje1U?controls=1" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
    return (
        <div className="h-full flex flex-col justify-between items-center">
            <div className="video-container">{emotion === "sad" ? sadVid : neutralVid}</div>
            <NextQuestionButton setCurrentQuestion={setCurrentQuestion} />
        </div>
    )
}

const SurveyVideo = (setCurrentQuestion, setSurveyAfter) => {
    const { register, handleSubmit } = useForm({
        defaultValues: {
            moodAfter: 0
        }
    });
    const onSubmit = data => {
        console.log(data);
        // vérifier l'inputs numériques
        setSurveyAfter(data);
        setCurrentQuestion((prevState) => prevState + 1)
    };
    return (
        <div className="flex flex-col lg:flex-row h-full sm:ml-10">
            <form className="h-full flex flex-col items-start" onSubmit={handleSubmit(onSubmit)}>
                <label>
                    <div className="text-left">
                        Entrez de nouveau le numéros de la case de la grille qui correspond le mieux à votre état émotionnel actuel :
                        <input className="ml-2" type="number" placeholder="0" {...register('moodAfter', { required: true })} />
                    </div>
                </label>
                <input className="self-center mt-7 text-xl p-2 border-2 rounded-md hover:bg-gray-50" type="submit" value="Valider 👌" />
            </form>
            <img src={fig_circumplex} className="my-2 object-scale-down h-full sm:h-4/5 lg:h-full" alt="" />
        </div>
    )
}

const ConsigneRTTest = (setCurrentQuestion) => (
    <div className="h-full flex flex-col justify-between items-center">
        <div>
            <div>Vous allez faire un test de temps de réaction.</div>
            <div>Lorsque l'arrière-plan change de couleur, cliquez n'importe où le plus vite possible.</div>
            <div>La prochaine question sera un entraînement d'un seul essai.</div>
        </div>
        <NextQuestionButton setCurrentQuestion={setCurrentQuestion} />
    </div>
)

const TrialRTTest = (setCurrentQuestion) => {
    const [RT, setRT] = useState(0);
    const [isFinish, setIsFinish] = useState(false)
    const cl = (RT) => {
        setIsFinish(true);
        setRT(RT);
    }
    const testEndedDiv = <div className="h-full flex flex-col justify-between items-center">
        <div>
            <div>Votre temps de réaction : {RT}</div>
            <div>Prêt pour le vrai test ? Passez à la question suivante.</div>
        </div>
        <NextQuestionButton setCurrentQuestion={setCurrentQuestion} />
    </div>
    return (
        <div className="h-full w-full">
            {isFinish ? testEndedDiv : <ReactionTimeTest callback={cl} />}
        </div>
    )
}
const QuestionRTTest = (setCurrentQuestion, onRTUpdate) => {
    const [nbEssai, setNbEssai] = useState(0);
    const cb = (RT) => {
        setNbEssai(prevState => prevState + 1);
        onRTUpdate(prevState => {
            prevState.push(RT)
            return prevState
        });
        console.log("RT:", RT);
    }
    if (nbEssai < 15) {
        return <div className="h-full w-full"><ReactionTimeTest key={nbEssai} callback={cb} /><div>{nbEssai+1}/{15}</div></div>
    }
    else {
        return (
            <div className="h-full flex flex-col items-center justify-between">
                <div>Test terminé, allez à la question suivante ;)</div>
                <NextQuestionButton setCurrentQuestion={setCurrentQuestion} />
            </div>
        )
    }
};

const ReactionTimeTest = ({ callback }) => {
    const [compteur, setCompteur] = useState(2);
    const [reaction, setReaction] = useState(false);
    const [timeBefore, setTimeBefore] = useState(0);
    const [intervalID, setIntervalID] = useState(0);
    const [isStarted, setIsStarted] = useState(false);

    useEffect(() => {
        if (!isStarted) {
            const interval = setInterval(() => {
                setCompteur(prevCompteur => prevCompteur - 1);
            }, 1000);
            setIntervalID(interval);
            return () => clearInterval(interval);
        }
    }, [compteur, isStarted]);

    useEffect(() => {
        if (compteur === 0) {
            clearInterval(intervalID)
            setIsStarted(true);

            const timeToWait = getRandomInt(1000, 3000);
            const timeoutIntervalID = setTimeout(() => {
                setTimeBefore(performance.now());
                setReaction(true);
            }, timeToWait);
            return () => clearInterval(timeoutIntervalID)
        }
    }, [compteur, intervalID])

    return (
        <div className={reaction ? "bg-red-600 h-95/100 flex flex-col items-center justify-center" : "bg-black h-95/100 flex flex-col items-center justify-center"} onClick={reaction ? ((e) => { callback(performance.now() - timeBefore); }) : undefined}>
            {!isStarted && (<div className="border-2 rounded-lg p-3 text-white">{compteur}</div>)}
        </div>
    )
}

const FinalQuestion = (setCurrentQuestion, handleSubmitButtonClick) => {
    const [clicked, setClicked] = useState(0);

    const callback = () => {
        setClicked(1)
    };
    return (
        <div className="h-full flex flex-col items-center justify-between">
            <div>
                <div>C'est terminé, merci beaucoup de votre participation !</div>
                <div>Vous pouvez envoyer vos résultats en cliquant sur le dernier bouton, puis fermer la page.</div>
            </div>
            <button className="text-xl p-2 border-2 rounded-md hover:bg-gray-50"
                onClick={(e) => {
                    if (!clicked){
                        handleSubmitButtonClick(callback);
                    }
                }}>
                {clicked ? "Fait ✔️📨" : "Envoyer mes résultats 📮"}
            </button>
        </div>
    )
}

const NextQuestionButton = ({ setCurrentQuestion }) => (
    <button className="text-xl p-2 border-2 rounded-md hover:bg-gray-50"
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

