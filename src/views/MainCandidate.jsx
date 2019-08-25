import React from 'react'

import getLocalStorageRole from './../uJob-local-storage'

const validateCandidate = (props) => {
    if (getLocalStorageRole() !== 'user')
        props.history.push('/signin')
}

export default function MainCandidate(props) {
    validateCandidate(props)

    return 'maincandidate'
}