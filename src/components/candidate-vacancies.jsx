import React from 'react'

export default function CandidateVacancies(props){    
    const display = {}

    if(!props.display)
        Object.assign(display, {display: 'none'}) 


    return(
        <div style={display}>
            candidate-vacancies
        </div>
    )
}