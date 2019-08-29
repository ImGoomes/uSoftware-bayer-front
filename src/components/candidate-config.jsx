import React from 'react'

export default function CandidateConfig(props){    
    const display = {}

    if(!props.display)
        Object.assign(display, {display: 'none'}) 


    return(
        <div style={display}>
            Candidate-config
        </div>
    )
}