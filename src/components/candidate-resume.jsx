import React from 'react'

export default function CandidateResume(props){    
    const display = {}

    if(!props.display)
        Object.assign(display, {display: 'none'}) 


    return(
        <div style={display}>
            candidate-resume
        </div>
    )
}