import React from 'react'

export default function RecruiterConfig(props){    
    const display = {}

    if(!props.display)
        Object.assign(display, {display: 'none'}) 


    return(
        <div style={display}>
            recruiter-config
        </div>
    )
}