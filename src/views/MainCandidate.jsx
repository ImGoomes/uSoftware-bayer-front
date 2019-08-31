import React, {useState, useEffect} from 'react'
import { Grid, Col, Row } from 'react-bootstrap'
import './../css/dashboard.css'
import {getLocalStorageRole, removeLocalStorage, getLocalStorageName} from './../uJob-local-storage'
import { LateralMenu, LateralMenuButton } from './../components/lateral-menu'
import { TopMenu } from './../components/top-menu'
import CandidateConfig from '../components/candidate-config'
import CandidateVacancies from '../components/candidate-vacancies'
import CandidateResume from '../components/candidate-resume'

const signOut = (props)=>{
    props.history.push('/signin')
    removeLocalStorage()
}

const validateCandidate = (props) => {
    debugger;
    // if (getLocalStorageRole() !== 'user')
    //     props.history.push('/signin')
}

export default function MainCandidate(props) {
    //validateCandidate(props)



    const [curriculum, setCurriculum] = useState(false)
    const [vacancy, setVacancy] = useState(true)
    const [config, setConfig] = useState(false)

    return (
        <Grid fluid={true}>
            <Row>
                <LateralMenu siteName="u.Software">
                    <LateralMenuButton icon="pe-7s-portfolio" active={vacancy} handleOnClick={()=>{setCurriculum(false); setVacancy(true); setConfig(false)}}>
                        Vagas
                    </LateralMenuButton>
                    <LateralMenuButton icon="pe-7s-id" active={curriculum} handleOnClick={()=>{setCurriculum(true); setVacancy(false); setConfig(false)}}>
                        Currículo
                    </LateralMenuButton>
                    <LateralMenuButton icon="pe-7s-config" active={config} handleOnClick={()=>{setCurriculum(false); setVacancy(false); setConfig(true)}}>
                        Configurações
                    </LateralMenuButton>
                    <LateralMenuButton icon="pe-7s-back" active={false} handleOnClick={()=>{signOut({...props})}}>
                        Sair
                    </LateralMenuButton>
                </LateralMenu>

                    <TopMenu title={`Bem-Vindo ${getLocalStorageName()}`} />
                    <div>
                        <CandidateResume display={curriculum}/>
                        <CandidateVacancies display={vacancy}/>
                        <CandidateConfig display={config}/>
                    </div>

            </Row>
        </Grid>
    )
}
