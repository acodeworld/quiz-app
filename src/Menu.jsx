import React from "react"



export default function (props) {
    const [gameStarted, setGameStarted] = React.useState(false)

    
    
    
    return (
        <>
        <div className="start-container">
            <h1 className="game-title">Quizzical</h1>
            <h3 className="game-description">Test your knowledge!</h3>
            <button className="start-btn" onClick={props.startGame}>Start Quiz</button>
        </div>
        
   
  
        </>
        
       
    )
}
