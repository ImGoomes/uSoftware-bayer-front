import React from 'react'
import { LateralMenu, LateralMenuButton } from './../components/lateral-menu'
import { TopMenu } from './../components/top-menu'
import './../css/dashboard.css'
import { Grid, Col, Row } from 'react-bootstrap'

import {getLocalStorageRole} from './../uJob-local-storage'

const validateCandidate = (props) => {
    if (getLocalStorageRole() !== 'user')
        props.history.push('/signin')
}

export default function MainCandidate(props) {
    //validateCandidate(props)

    return (
        <Grid fluid={true}>
            <Row>
                <LateralMenu siteName="u.Software">
                    <LateralMenuButton icon="pe-7s-id" active={false} href="admin/dashboard">
                        Currículo
                    </LateralMenuButton>
                    <LateralMenuButton icon="pe-7s-portfolio" active={false} href="admin/dashboard">
                        Vagas
                    </LateralMenuButton>
                    <LateralMenuButton icon="pe-7s-config" active={false} href="admin/config">
                        Configurações
                    </LateralMenuButton>
                    <LateralMenuButton icon="pe-7s-back" active={false} href="admin/logout">
                        Sair
                    </LateralMenuButton>
                </LateralMenu>
                <div className="wrapper-right">
                    <TopMenu title="Bem Vindo Candidato!"/>
                    <div className="content">
                        <p>teste</p>
                    </div>
                </div>
            </Row>
        </Grid>
    )
}