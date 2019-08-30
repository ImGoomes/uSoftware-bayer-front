import React from 'react'

export default function RecruiterVacancies(props){    
    const display = {}

    if(!props.display)
        Object.assign(display, {display: 'none'}) 


    return(
        <div style={display}>
            recruiter-vacancies
        </div>
    )
}