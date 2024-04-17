import React from "react"
import ReactDOM from "react-dom"
import Questions from "./Questions"
import Menu from "./Menu"
import {decode} from 'html-entities'
import './App.css'







export default function() {
const [questions, setQuestions] = React.useState([])
const [answers, setAnswers] = React.useState([])
const [questionsLoaded, setQuestionsLoaded] = React.useState(false)
const [id, setId] = React.useState([])
const [checked, setChecked] = React.useState(false)
const [correctCount, setCorrectCount] = React.useState(0)
const [isGameStarted, setIsGameStarted] = React.useState(false)
const [startNewGame, setStartNewGame] = React.useState(false)
const [isGameEnded, setIsGameEnded] = React.useState(false)


React.useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5&category=21&difficulty=easy&type=multiple")
        .then(res => res.json())
        .then(data => setQuestions(data.results))
        .then(() => setQuestionsLoaded(!true))
 },[])
 
 React.useEffect(() => {
     
    setAnswers(arr.sort())
}, [questions])

console.log(answers)
console.log(answers.sort())

function startGame() {
   setIsGameStarted(true)
} 
 
function gameReset() {
            setIsGameEnded(false)
            setChecked(false) 
            setCorrectCount(0)
                        
            fetch("https://opentdb.com/api.php?amount=5&category=21&difficulty=easy&type=multiple")
                .then(res => res.json())
                .then(data => setQuestions(data.results))
                .then(() => setQuestionsLoaded(!true))
}

const incorrectAnswers = questions.map((e, index) => e.incorrect_answers.concat(e.correct_answer));


function handleClick() {
    
    if(isGameEnded === false) {
        let emptyArr = [];
 
           answers.map((item, index) => {
                emptyArr.push(                
                    item.map(item => {
                    if(item.isSelected === true && item.isCorrect === true) {
                        setCorrectCount(prev => prev + 1)
                        return (
                            {...item, style: {backgroundColor: "lightgreen"}}
                        )
                    } else if (item.isSelected === true && item.isCorrect === false) {
                        return (
                            {...item, style: {backgroundColor: "pink"}}
                        )
                    
                    } else if (item.isCorrect === true ) {
                        return (
                            {...item, style: {backgroundColor: "lightgreen"}}
                        )
                    
                    } else {
                        return item
                    }
                  
                }))

            }) 
            
            setAnswers(emptyArr)
            setChecked(true) 
            setIsGameEnded(true)
            
        } else {
            
            gameReset()
        }
        
    }
        
//Changes background of selected answer
    function click(ans) {  
        let empty = []  
        
          answers.map((item, index) => {
              if(ans.questionNum === index && checked === false) {
                        empty.push(item.map((e, index) => {
          
                         return ans.id === e.id? {...e, style: {backgroundColor: "#D6DBF5"}, isSelected: true} 
                         : {...e, style: {backgroundColor: "white"}, isSelected: false}
                }))   
              } else {
                  empty.push(item)
              }

            })
                setAnswers(empty)
        }


//After questions are loaded, uses the question objects to create answer objects
let arr = [];  
if(questions.length > 0) {
    const settingObj = incorrectAnswers.map((item, index1) => {
            
    arr.push(item.map((e, index) => {
          
       return index === 3 ? {
            value: e,
            isCorrect: true,
            id:Date.now() + Math.random(),
            style:{backgroundColor: "white"},
            questionNum: index1,
            isSelected: false,
            key: Date.now() + Math.random(),
       
            } : {
            value: e,
            isCorrect: false,
            id:Date.now() + Math.random(),
            style:{backgroundColor: "white"},
            questionNum: index1,
            isSelected: false,
            key: Date.now() + Math.random(),
            }

        }))
      
    })
} 
 


const gameQuestions = questions.map((e, index) => {
    return <Questions 
        id = {Date.now() + Math.random()}
        // handleClick={handleClick}
        question = {decode(e.question)}
        incorrectAnswers = {decode(e.incorrect_answers)}
        correctAnswers = {[decode(e.correct_answer)]}
        btnClick={click}
        answers={answers[index]}
        key = {Date.now() + Math.random()}
        />     
   })






return (  
    
    <>
        
        {isGameStarted === false && <Menu startGame={startGame} />}

        {isGameStarted === true && answers.length > 0 ? 
        <div className="container">
            <div className="quiz-container">
                    {gameQuestions}
                <div className="check-container">

                    {checked ? <h3 className="score-text" style={{ visibility: 'visible'}} >You answered {correctCount} / {questions.length} correctly!</h3> :""}
                    <button className="checkAnswers-btn" onClick={handleClick}>{checked === false ?"Check Answers" : "Play Again"}</button>
                </div>  
            </div> 
        </div> : null}
           
    </> 
          
        )
}
