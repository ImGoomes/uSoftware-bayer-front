import React, {useState} from 'react'
import { Grid, Col, Row } from 'react-bootstrap'

import {getLocalStorageRole, removeLocalStorage, getLocalStorageName} from './../uJob-local-storage'
import {LateralMenu, LateralMenuButton} from "../components/lateral-menu";
import {TopMenu, TopMenuItem, TopMenuDropdown} from "../components/top-menu"
import RecruiterDashboard from '../components/recruiter-dashboard';
import RecruiterVacancies from '../components/recruiter-vacancies'
import RecruiterConfig from '../components/recruiter-config';

const signOut = (props)=>{
    props.history.push('/signin')
    removeLocalStorage()
}

const validateCandidate = (props) => {
    if (getLocalStorageRole() !== 'recruiter')
        props.history.push('/signin')
}

export default function MainRecruiter(props){
    //validateCandidate(props)

    const [dashboard, setDashboard] = useState(false)
    const [vacancy, setVacancy] = useState(false)
    const [config, setConfig] = useState(false)

    return (
        <Grid fluid={true}>
            <Row>
                <LateralMenu siteName="u.Software">
                    <LateralMenuButton icon="pe-7s-graph" active={false} handleOnClick={()=>{setDashboard(true); setVacancy(false); setConfig(false)}}>
                        Dashboard
                    </LateralMenuButton>
                    <LateralMenuButton icon="pe-7s-portfolio" active={false} handleOnClick={()=>{setDashboard(false); setVacancy(true); setConfig(false)}}>
                        Vagas
                    </LateralMenuButton>
                    <LateralMenuButton icon="pe-7s-config" active={false} handleOnClick={()=>{setDashboard(false); setVacancy(false); setConfig(true)}}>
                        Configurações
                    </LateralMenuButton>
                    <LateralMenuButton icon="pe-7s-back" active={false} handleOnClick={()=>{signOut({...props})}}>
                        Sair
                    </LateralMenuButton>
                </LateralMenu>
                <div className="wrapper-right">
                    <TopMenu title={`Bem-Vindo ${getLocalStorageName()}`} />
                    <div className="content">
                        <RecruiterDashboard display={dashboard}/>
                        <RecruiterVacancies display={vacancy}/>
                        <RecruiterConfig display={config}/>
                    </div>
                </div>
            </Row>
        </Grid>

    )
}
