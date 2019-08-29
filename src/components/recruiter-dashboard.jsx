import React from 'react'

export default function RecruiterDashboard(props){    
    const display = {}

    if(!props.display)
        Object.assign(display, {display: 'none'}) 


    return(
        <div style={display}>
            recruiter-Dash
        </div>
    )
}