import React from 'react'

import {getLocalStorageRole} from './../uJob-local-storage'
import {LateralMenu, LateralMenuButton} from "../components/lateral-menu";
import {TopMenu, TopMenuItem, TopMenuDropdown} from "../components/top-menu"
import { Grid, Col, Row } from 'react-bootstrap'

const validateCandidate = (props) => {
    if (getLocalStorageRole() !== 'recruiter')
        props.history.push('/signin')
}

export default function MainRecruiter(props){
    validateCandidate(props)

    return (
        <Grid fluid={true}>
            <Row>
                <LateralMenu siteName="u.Software">
                    <LateralMenuButton icon="pe-7s-graph" active={false} href="admin/dashboard">
                        Dashboard
                    </LateralMenuButton>
                    <LateralMenuButton icon="pe-7s-portfolio" active={false} href="admin/dashboard">
                        Vagas
                    </LateralMenuButton>
                    <LateralMenuButton icon="pe-7s-config" active={false} href="admin/dashboard">
                        Configurações
                    </LateralMenuButton>
                    <LateralMenuButton icon="pe-7s-back" active={false} href="admin/logout">
                        Sair
                    </LateralMenuButton>
                </LateralMenu>
                <div className="wrapper-right">
                    <TopMenu title="Bem Vindo Recrutador!">
                        <TopMenuDropdown title="Dropdown">
                            <TopMenuItem href="#">Opção 4</TopMenuItem>
                            <TopMenuItem href="#">Opção 5</TopMenuItem>
                            <TopMenuItem href="#">Opção 6</TopMenuItem>
                            <TopMenuItem href="#">Opção 7</TopMenuItem>
                        </TopMenuDropdown>
                        <TopMenuItem href="#">Opção 1</TopMenuItem>
                        <TopMenuItem href="#">Opção 2</TopMenuItem>
                        <TopMenuItem href="#">Opção 3</TopMenuItem>
                    </TopMenu>
                    <div className="content">
                        <p>teste</p>
                    </div>
                </div>
            </Row>
        </Grid>

    )
}
