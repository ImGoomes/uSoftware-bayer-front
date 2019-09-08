import React, {useState} from 'react'
import './../css/light-bootstrap-dashboard-react.css'
import { Col, Grid, Row } from 'react-bootstrap'
import axios from 'axios'
import getLocalStorage from './../uJob-local-storage'
import jQuery from 'jquery'

const issueValidationError = function (msg) {
    jQuery.alert({ type: 'red', title: 'Erro', content: msg })
    throw new Error(msg)
}

const checkForm = (props) => {
    console.log(props)
    if (props.job === '')
        issueValidationError('Nome da vaga é um campo obrigatório!')
    else if (props.quantity === '')
        issueValidationError('Quantidade de vagas é um campo obrigatório!')
    else if (props.recruiter_id === '')
        issueValidationError('Nome do recrutador é um campo obrigatório!')
    else if (props.description === '')
        issueValidationError('Descrição da vaga é um campo obrigatório!')
}

const registerVacancy = async (props) => {

    try {
        //Verificando se o formulário está preenchido corretamente
        checkForm(props)

        //Chamada para o back-end
        axios.post(`${process.env.REACT_APP_API_ADDRESS}/vacancy`, {
            job: props.job,
            quantity: props.quantity,
            recruiter_id: props.recruiter_id,
            description: props.description
        }, {headers: { token: props.token }}).then(response => {
                jQuery.alert({
                    title: 'Informação',
                    content: 'A vaga foi cadastrada com sucesso!'
                })
        })
    } catch (error) {
        console.log(error)
    }
}

const getRecruiters = function (stateChanges) {
    const localStorage = getLocalStorage()
    axios.get(
        `${process.env.REACT_APP_API_ADDRESS}/recruiter`,
        { headers: {token: localStorage.token} }
    ).then(response => {
        if (response.data.recruiters !== undefined)
            stateChanges.setRecruiters(response.data.recruiters)
    }).catch(error => {
        console.log(error)
    })
}

let isFirstTime = true

export default function RecruiterVacancies(props){    
    const display = {}
    const localStorage = getLocalStorage()
    const [job, setJob] = useState('')
    const [quantity, setQuantity] = useState(0)
    const [recruiter, setRecruiter] = useState('')
    const [recruiters, setRecruiters] = useState([])
    const [description, setDescription] = useState('')

    if (isFirstTime) {
        getRecruiters({setRecruiters: setRecruiters})
        isFirstTime = false
    }

    if(!props.display)
        Object.assign(display, {display: 'none'})

    return(
        <div style={display}>
            <div className="justify-content-center">
                <Col md="auto">
                    <div className="box-dash width-signup">
                        <form className="form">
                            <h2>Criar Vaga</h2>
                            <label className="control-label">Nome da Vaga</label>
                            <input type="text" value={job} className="form-control mb-2" id="job" placeholder="Nome da Vaga" onChange={(e) => { setJob(e.target.value)  }}/>

                            <label className="control-label">Quantidade</label>
                            <input type="number" min="1" value={quantity} className="form-control mb-2" id="lastName" placeholder="Quantidade" onChange={(e) => { setQuantity(e.target.value) }}/>

                            <label className="control-label">Recrutador</label>
                            <select className="form-control mb-2" id="recruiter" onChange={(e) => { setRecruiter(e.target.value) }} >
                                {recruiters.map((rec, i) => {
                                    return (<option key={i} value={rec.recruiter_id}>{rec.name}</option>)
                                })}
                            </select>

                            <label className="control-label">Descrição</label>
                            <textarea className="form-control mb-2" id="description" placeholder="description" onChange={(e) => { setDescription(e.target.value) }} >{description}</textarea>

                            <footer>
                                <button type="button" className="btn btn-blue btn-block" onClick={() => {
                                    registerVacancy({
                                        token: localStorage.token,
                                        user_id: localStorage.user_id,
                                        job: job,
                                        quantity: Number.parseInt(quantity),
                                        recruiter_id: Number.parseInt(recruiter),
                                        description: description
                                    })
                                }}>Salvar</button>
                            </footer>
                        </form>
                    </div>
                </Col>
            </div>
        </div>
    )
}