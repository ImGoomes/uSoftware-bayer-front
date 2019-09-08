import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import InputMask from 'react-input-mask'
import { Grid, Row, Col } from 'react-bootstrap'

import './../css/sign-up.css'

const checkForm = (props) => {
    if (props.name === '')
        throw new Error('Nome é um campo obrigatório')
    else if (props.lastName === '')
        throw new Error('Sobrenome é um campo obrigatório')
    else if (props.email === '')
        throw new Error('Email é um campo obrigatório')
    else if (props.password === '')
        throw new Error('Senha é um campo obrigatório')
    else if (props.passwordConfirmation === '')
        throw new Error('Confimação de Senha é um campo obrigatório')
    else if (props.password !== props.passwordConfirmation)
        throw new Error('A senha e sua confirmação devem ser examente iguais')

    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!re.test(String(props.email).toLowerCase()))
        throw new Error('O e-mail fornecido não é válido')
}

const signUp = async (props) => {
    try {
        //Verificando se o formulário está preenchido corretamente
        checkForm(props)

        //Chamada para o back-end
        await axios.post(`${process.env.REACT_APP_API_ADDRESS}/signup`, {
            name: props.name,
            lastName: props.lastName,
            address: props.address,
            mobilePhone: props.mobilePhone,
            email: props.email,
            password: props.password,
            passwordConfirmation: props.passwordConfirmation
        })

        alert('Cadastro realizado com sucesso. Você será redirecionado para a tela de login')

        //Alterando a URL sem dar o load na página
        props.props.history.push('/signin') //Alterar a URL
    } catch (error) {
        alert(error.message)
    }
}

export default function SignUp(props) {

    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [address, setAddress] = useState('')
    const [mobilePhone, setMobilePhone] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')

    return (
        <Grid>
            <Row className="justify-content-center">
                <Col md="auto">
                    <div className="box width-signup">
                        <form className="form">
                            <h2>Registre-se</h2>
                            <label className="control-label">Nome</label>
                            <input type="text" className="form-control mb-2" id="name" placeholder="Nome" value={name} onChange={(e) => { setName(e.target.value) }} />

                            <label className="control-label">Sobrenome</label>
                            <input type="text" className="form-control mb-2" id="lastName" placeholder="Sobrenome" value={lastName} onChange={(e) => { setLastName(e.target.value) }} />

                            <label className="control-label">Telefone</label>
                            <InputMask mask="(99) 99999-9999" className="form-control mb-2" maskChar=" " placeholder="Celular" value={mobilePhone} onChange={(e) => { setMobilePhone(e.target.value) }} />

                            <label className="control-label">E-mail</label>
                            <input type="email" className="form-control mb-2" id="email" placeholder="E-mail" value={email} onChange={(e) => { setEmail(e.target.value) }} />

                            <label className="control-label">Senha</label>
                            <input type="password" className="form-control mb-2" id="password" placeholder="Senha" value={password} onChange={(e) => { setPassword(e.target.value) }} />

                            <label className="control-label">Confirme a Senha</label>
                            <input type="password" className="form-control mb-2" id="passwordConfirmation" placeholder="Confirmação de Senha" value={passwordConfirmation} onChange={(e) => { setPasswordConfirmation(e.target.value) }} />

                            <footer>
                                <button type="button" className="btn btn-blue btn-block" onClick={() => {
                                    signUp({
                                        props: props,
                                        name: name,
                                        lastName: lastName,
                                        address: address,
                                        mobilePhone: mobilePhone,
                                        email: email,
                                        password: password,
                                        passwordConfirmation: passwordConfirmation
                                    })
                                }}>Registrar</button>
                                <Link className="btn btn-blue btn-block" to="/signin">Entrar</Link>
                            </footer>
                        </form>
                    </div>
                </Col>
            </Row>
        </Grid>
    )
}
