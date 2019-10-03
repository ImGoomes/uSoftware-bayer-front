import React, { useState, useEffect } from 'react'
import { Grid, Col, Row } from 'react-bootstrap'
import './../css/dashboard.css'
import {
    getLocalStorageRole,
    removeLocalStorage,
    getLocalStorageName
} from './../uJob-local-storage'
import { LateralMenu, LateralMenuButton } from './../components/lateral-menu'
import { TopMenu } from './../components/top-menu'
import CandidateConfig from '../components/candidate-config'
import CandidateResume from '../components/candidate-resume'
import CandidateVacanciesSelf from './CandidateVacanciesSelf'

const signOut = props => {
    props.history.push('/signin')
    removeLocalStorage()
}

const validateCandidate = props => {
    debugger
    // if (getLocalStorageRole() !== 'user')
    //     props.history.push('/signin')
}

export default function MainCandidate(props) {
    //validateCandidate(props)

    const [curriculum, setCurriculum] = useState(false)
    const [vacancy, setVacancy] = useState(false)
    const [config, setConfig] = useState(false)

    return (
        <Grid fluid={true}>
            <Row>
                <LateralMenu siteName='u.Software'>
                    <LateralMenuButton
                        icon='pe-7s-portfolio'
                        active={false}
                        handleOnClick={() => {
                            setCurriculum(false)
                            setVacancy(true)
                            setConfig(false)
                        }}
                    >
                        Vagas
                    </LateralMenuButton>
                    <LateralMenuButton
                        icon='pe-7s-id'
                        active={false}
                        handleOnClick={() => {
                            setCurriculum(true)
                            setVacancy(false)
                            setConfig(false)
                        }}
                    >
                        Currículo
                    </LateralMenuButton>
                    <LateralMenuButton
                        icon='pe-7s-config'
                        active={false}
                        handleOnClick={() => {
                            setCurriculum(false)
                            setVacancy(false)
                            setConfig(true)
                        }}
                    >
                        Configurações
                    </LateralMenuButton>
                    <LateralMenuButton
                        icon='pe-7s-back'
                        active={false}
                        handleOnClick={() => {
                            signOut({ ...props })
                        }}
                    >
                        Sair
                    </LateralMenuButton>
                </LateralMenu>

                <div className='wrapper-right'>
                    <TopMenu title={`Bem-Vindo ${getLocalStorageName()}`} />
                    <div className="content">

                    {/* <CandidateResume display={curriculum} /> */}
                    {curriculum && <CandidateResume display={curriculum}/>}
                    
                    {/* <CandidateVacanciesSelf display={vacancy} /> */}
                    {vacancy && <CandidateVacanciesSelf display={vacancy}/>}
                    
                    {/* <CandidateConfig history={props.history} display={config} /> */}
                    {config && <CandidateConfig history={props.history} display={config}/>}
                
                    </div>
                
                </div>
            </Row>
        </Grid>
    )
}
