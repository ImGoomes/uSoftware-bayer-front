import React from 'react'
import { LateralMenu, LateralMenuButton } from './../components/lateral-menu'

import getLocalStorageRole from './../uJob-local-storage'

const validateCandidate = (props) => {
    if (getLocalStorageRole() !== 'user')
        props.history.push('/signin')
}

export default function MainCandidate(props) {
    validateCandidate(props)

    return (
        <LateralMenu siteName="u.Software">
            <LateralMenuButton icon="pe-7s-id" active={false} href="admin/dashboard">
                Currículo
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