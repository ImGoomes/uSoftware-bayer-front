import React from 'react'

export default function CandidateVacancies(props){    
    const display = {}

    if(!props.display)
        Object.assign(display, {display: 'none'}) 


    return(
        <div style={display}>
            <div className="container-vacancies">
                <aside className="categorias section">
                </aside>
                <div class="container-right">
                    <section className="filtros section"></section>
                    <section className="painel-vagas section"></section>
                </div>
            </div>
        </div>
    )
}