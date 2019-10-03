import React, { useState } from 'react'
import './../css/candidate-vacancies.css'
import axios from 'axios'
import getLocalStorage from './../uJob-local-storage'
import {Card, CardContent, CardFooter, CardTitle} from "./card/Card";

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
            <span className="centro">
                {props.children}
            </span>
        </section>
    )
}

export default function CandidateVacancies(props){
    const [ vacancies, setVacancies ] = useState([])
    const display = {}

    if(!props.display)
        Object.assign(display, {display: 'none'})

    //mesma coisa que componentDidMount - popular state com as vagas nele
    React.useEffect(() => {
        let ls = getLocalStorage()

        axios.get(`${process.env.REACT_APP_API_ADDRESS}/vacancyToUser`,{
            headers: { token: ls.token}
        }).then(response=>{
            console.log(response.data)
            // setVacancies(response.data)
        })

    });

    debugger;
    const cards = vacancies.forEach(vacancie => (
        <Card width="47%">
            <CardTitle>vacancie.job</CardTitle>
            <CardContent>Lorem ipsum.</CardContent>
            <CardFooter>Footer</CardFooter>
        </Card>
    ))

    return(
        <div style={display}>
            <div className="container-vacancies">
                <div className="container-right">
                    <TopSection>Filtros</TopSection>
                    <ContentSection>
                        {cards}
                    </ContentSection>
                </div>
            </div>
        </div>
    )
}
