import React from 'react'

import getLocalStorageRole from './../uJob-local-storage'
import {LateralMenu, LateralMenuButton} from "../components/lateral-menu";

const validateCandidate = (props) => {
    if (getLocalStorageRole() !== 'recruiter')
        props.history.push('/signin')
}

export default function MainRecruiter(props){
    validateCandidate(props)

    return (
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
        </LateralMenu>
    )
}
