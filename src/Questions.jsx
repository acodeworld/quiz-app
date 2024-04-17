import React from "react"


export default function(props) {


    const btn = props.answers.map((e, index) => {
    return <button 
    id={props.id}
    className="answer-btn" 
    onClick={() => props.btnClick(e)}
    key={Date.now() + Math.random()}
    style={e.style}
    >{e.value} 
    </button>
})
    

console.log(btn)

    return (
        <>
        <div className="question-container">
            <h3 className="question-title">{props.question}</h3>
            {btn}

            <hr/>
        </div>

       
         </>            
    )
}



