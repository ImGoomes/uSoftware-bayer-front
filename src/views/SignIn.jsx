import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Grid, Row, Col } from 'react-bootstrap'
import jQuery from 'jquery'
import { setLocalStorage, removeLocalStorage } from './../uJob-local-storage'
import './../css/sign-in.css'

const signIn = async function(props) {
    try {
        //Verificação do formulário
        checkForm(props)
        const signIn = await axios.post(
            `${process.env.REACT_APP_API_ADDRESS}/signin`,
            { email: props.email, password: props.password }
        )
        jQuery.alert({
            title: 'Boas Vindas!',
            content: 'Seja bem vindo ao u.Job!'
        })

        setLocalStorage({ ...signIn.data })

        if (signIn.data.role === 'user')
            props.props.history.push('/maincandidate')
        else props.props.history.push('/mainrecruiter')
    } catch (error) {
        removeLocalStorage()

        //Se não é um erro de rede | Banco de dados ou back-end
        if (error.response === undefined) {
            jQuery.alert({
                type: 'red',
                title: 'Erro',
                content: error.message
            })
            return
        }

        //Se é um erro da banco de dados ou back-end
        switch (error.response.status) {
            case 404:
                jQuery.alert({
                    type: 'red',
                    title: 'Erro',
                    content: 'e-mail ou senha incorretos!'
                })
                break
            case 500:
                jQuery.alert({
                    type: 'red',
                    title: 'Erro',
                    content: 'ocorreu um erro de resposabilidade do servidor.'
                })
                break
            default:
                jQuery.alert({
                    type: 'red',
                    title: 'Erro',
                    content: error.message
                })
                break
        }
    }
}
const checkForm = props => {
    if (props.email === '') throw new Error('Email é um campo obrigatório!')
    else if (props.password === '')
        throw new Error('Senha é um campo obrigatório!')

    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!re.test(String(props.email).toLowerCase()))
        throw new Error('O e-mail fornecido não é válido')
}

export default function SignIn(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <Grid>
            <Row className='justify-content-center'>
                <Col md='auto'>
                    <div className='box width-signin'>
                        <header className='brand'>
                            <i className='pe-7s-portfolio'></i>
                            <span className='nome-projeto text-danger'>
                                u.Job
                            </span>
                        </header>
                        <form className='form'>
                            <label className='control-label'>E-mail</label>
                            <input
                                type='text'
                                className='form-control mb-2'
                                id='email'
                                placeholder='e-mail'
                                value={email}
                                onChange={e => {
                                    setEmail(e.target.value)
                                }}
                            />

                            <label className='control-label'>Password</label>
                            <input
                                type='password'
                                className='form-control mb-2'
                                id='password'
                                placeholder='password'
                                value={password}
                                onChange={e => {
                                    setPassword(e.target.value)
                                }}
                            />
                            <hr />
                            <button
                                type='button'
                                className='btn btn-blue btn-block'
                                onClick={() =>
                                    signIn({
                                        props,
                                        email,
                                        password
                                    })
                                }
                            >
                                Entrar
                            </button>
                            <Link
                                className='btn btn-blue btn-block'
                                to='/signup'
                            >
                                Registrar
                            </Link>
                        </form>
                    </div>
                </Col>
            </Row>
        </Grid>
    )
}
