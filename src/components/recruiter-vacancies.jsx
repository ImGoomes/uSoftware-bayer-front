import React, { useState } from 'react'
import './../css/light-bootstrap-dashboard-react.css'
import './../css/tags.css'
import { Col, Grid, Row } from 'react-bootstrap'
import { WithContext as ReactTags } from 'react-tag-input'
import axios from 'axios'
import getLocalStorage from './../uJob-local-storage'
import jQuery from 'jquery'
import { withRouter } from 'react-router'

/*Tags*/
const KeyCodes = {
    comma: 188,
    enter: 13
}

const delimiters = [KeyCodes.comma, KeyCodes.enter]

const issueValidationError = function(msg) {
    jQuery.alert({ type: 'red', title: 'Erro', content: msg })
    throw new Error(msg)
}

const checkForm = props => {
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

const registerVacancy = async props => {
    try {
        //Verificando se o formulário está preenchido corretamente
        checkForm(props)

        //Chamada para o back-end
        const response = await axios.post(
            `${process.env.REACT_APP_API_ADDRESS}/vacancy`,
            {
                job: props.job,
                recruiter_id: props.recruiter_id,
                description: props.description
            },
            { headers: { token: props.token } }
        )

        return response.data
    } catch (error) {
        console.log(error)
    }
}

const registerRequirements = async (tags, vacancy_id, token) => {
    try {
        const requirements = tags.map(tag => {
            return {
                name: tag.text,
                vacancy_id: vacancy_id
            }
        })

        const response = axios.post(
            `${process.env.REACT_APP_API_ADDRESS}/requirement`,
            requirements,
            { headers: { token: token } }
        )

        return response.data
    } catch (error) {
        throw error
    }
}

const getRecruiters = function(stateChanges) {
    const localStorage = getLocalStorage()
    axios
        .get(`${process.env.REACT_APP_API_ADDRESS}/recruiter`, {
            headers: { token: localStorage.token }
        })
        .then(response => {
            if (response.data.recruiters !== undefined)
                stateChanges.setRecruiters(response.data.recruiters)
        })
        .catch(error => {
            console.log(error)
        })
}

let isFirstTime = true

export default withRouter(function RecruiterVacancies(props) {
    const display = {}
    const localStorage = getLocalStorage()
    const [job, setJob] = useState('')
    const [description, setDescription] = useState('')
    const [tags, setTags] = useState([])

    const handleTagsDelete = function(i) {
        setTags(tags.filter((tag, index) => index !== i))
    }

    const handleTagsAddition = function(tag) {
        setTags([...tags, tag])
    }

    const handleTagsDrag = function(tag, currPos, newPos) {
        const newTags = tags.slice()

        newTags.splice(currPos, 1)
        newTags.splice(newPos, 0, tag)

        // re-render
        setTags(newTags)
    }
    /*End Tags*/

    if (isFirstTime) {
        isFirstTime = false
    }

    return (
        <div>
            <div className='justify-content-center'>
                <Col md='auto'>
                    <div className='box-dash width-signup'>
                        <form className='form'>
                            <h2>Criar Vaga</h2>
                            <label className='control-label'>
                                Nome da Vaga
                            </label>
                            <input
                                type='text'
                                value={job}
                                className='form-control mb-2'
                                id='job'
                                placeholder='Nome da Vaga'
                                onChange={e => {
                                    setJob(e.target.value)
                                }}
                            />

                            <label className='control-label'>Requisitos:</label>
                            <div>
                                <ReactTags
                                    tags={tags}
                                    classNames={{
                                        tags: 'tagsClass',
                                        tagInput: 'tagInputClass',
                                        tagInputField:
                                            'form-control mb-2 tagInputField',
                                        selected: 'selectedClass',
                                        tag: 'tagClass',
                                        remove: 'removeClass',
                                        suggestions: 'suggestionsClass',
                                        activeSuggestion:
                                            'activeSuggestionClass'
                                    }}
                                    placeholder='Escreva uma skill'
                                    handleDelete={handleTagsDelete}
                                    handleAddition={handleTagsAddition}
                                    handleDrag={handleTagsDrag}
                                    delimiters={delimiters}
                                />
                            </div>

                            <label className='control-label'>Recrutador</label>
                            <input
                                type='text'
                                value={localStorage.name}
                                enabled={false}
                                className='form-control mb-2'
                                id='recruiter'
                            />

                            <label className='control-label'>Descrição</label>
                            <textarea
                                className='form-control mb-2'
                                id='description'
                                placeholder='description'
                                onChange={e => {
                                    setDescription(e.target.value)
                                }}
                            >
                                {description}
                            </textarea>

                            <footer>
                                <button
                                    type='button'
                                    className='btn btn-blue btn-block'
                                    onClick={async function() {
                                        const response = await registerVacancy({
                                            token: localStorage.token,
                                            user_id: localStorage.user_id,
                                            job: job,
                                            recruiter_id:
                                                localStorage.recruiter_id,
                                            description: description
                                        })

                                        await registerRequirements(
                                            tags,
                                            response.vacancy.vacancy_id,
                                            localStorage.token
                                        )

                                        window.location.reload()
                                    }}
                                >
                                    Salvar
                                </button>
                            </footer>
                        </form>
                    </div>
                </Col>
            </div>
        </div>
    )
})
