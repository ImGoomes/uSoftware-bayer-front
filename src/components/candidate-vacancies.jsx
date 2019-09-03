import React from 'react'
import './../css/candidate-vacancies.css'

function Aside(props) {
    return (
        <aside className="categorias section">
            {props.children}
        </aside>
    )
}

function TopSection(props) {
    return (
        <section className="filtros section">
            {props.children}
        </section>
    )
}

function ContentSection(props) {
    return (
        <section className="painel-vagas section">
            {props.children}
        </section>
    )
}

export default function CandidateVacancies(props){    
    const display = {}

    if(!props.display)
        Object.assign(display, {display: 'none'}) 


    return(
        <div style={display}>
            <div className="container-vacancies">
                <Aside />
                <div class="container-right">
                    <TopSection />
                    <ContentSection />
                </div>
            </div>
        </div>
    )
}