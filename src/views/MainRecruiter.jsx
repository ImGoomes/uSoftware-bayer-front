import React from 'react'

import getLocalStorageRole from './../uJob-local-storage'

const validateCandidate = (props) => {
    if (getLocalStorageRole() !== 'recruiter')
        props.history.push('/signin')
}

export default function MainRecruiter(props){
    validateCandidate(props)

    return 'mainrecruiter'
}
