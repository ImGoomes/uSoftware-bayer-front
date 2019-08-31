import React,{useState} from 'react';
import './../css/light-bootstrap-dashboard-react.css'
import {Col, Grid, Row} from "react-bootstrap";
import InputMask from 'react-input-mask'
import axios from "axios";

import getLocalStorage from './../uJob-local-storage'

const checkForm = (props) => {
    if (props.name === '')
        throw new Error('Nome é um campo obrigatório')
    else if (props.lastName === '')
        throw new Error('Sobrenome é um campo obrigatório')
    else if (props.email === '')
        throw new Error('Email é um campo obrigatório')
    else if (props.password === '')
        throw new Error('Senha é um campo obrigatório')

    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    console.log(props)
    if (!re.test(String(props.email).toLowerCase()))
        throw new Error('O e-mail fornecido não é válido')
}

const updateUser = async (props) => {
    try {
        //Verificando se o formulário está preenchido corretamente
        checkForm(props)

        debugger;

        //Chamada para o back-end
        await axios.put(`${process.env.REACT_APP_API_ADDRESS}/user`, {
            user_id: props.user_id,
            name: props.name,
            lastName: props.lastName,
            mobilePhone: props.mobilePhone,
            email: props.email,
            password: props.password,
        }, {
            headers: { token: props.token }
        })

        //Alterando a URL sem dar o load na página
        props.props.history.push('/signin') //Alterar a URL
    } catch (error) {
        console.log(error)
        alert(error.message)
    }
}

const loadUser = (stateChanges, props) => {
    //Chamada para o back-end
    axios.get(`${process.env.REACT_APP_API_ADDRESS}/user/` + props.user_id,{
        headers: { token: props.token , param: 'user_id'}
    }).then(response=>{
        const user = response.data.users[0]
        stateChanges.setName(user.name)
        stateChanges.setLastName(user.lastName)
        stateChanges.setMobilePhone(user.mobilePhone)
        stateChanges.setEmail(user.email)
        stateChanges.setPassword(user.password)
    })
}

let isFirstTime = true

export default function CandidateConfig (props){
    const display = {}

    if(!props.display)
        Object.assign(display, {display: 'none'})


    const userLocalstg = getLocalStorage();

    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [mobilePhone, setMobilePhone] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    if(isFirstTime) {
        loadUser({setName, setLastName, setMobilePhone, setEmail, setPassword}, userLocalstg)
        isFirstTime = false;
    }

    return(
        <div style={display}>
            <div className="justify-content-center">
                <Col md="auto">
                    <div className="box-dash width-signup">
                        <form className="form">
                            <h2>Informações</h2>
                            <label className="control-label">Nome</label>
                            <input type="text" value={name} className="form-control mb-2" id="name" placeholder="Nome" onChange={(e) => { setName(e.target.value)  }}/>

                            <label className="control-label">Sobrenome</label>
                            <input type="text" value={lastName} className="form-control mb-2" id="lastName" placeholder="Sobrenome" onChange={(e) => { setLastName(e.target.value) }}/>

                            <label className="control-label">Telefone</label>
                            <InputMask mask="(99) 99999-9999" value={mobilePhone} className="form-control mb-2" maskChar=" " placeholder="Celular" onChange={(e) => { setMobilePhone(e.target.value) }}/>

                            <label className="control-label">E-mail</label>
                            <input type="email" value={email} className="form-control mb-2" id="email" placeholder="E-mail" onChange={(e) => { setEmail(e.target.value) }}/>

                            <label className="control-label">Senha</label>
                            <input type="text" value={password} className="form-control mb-2" id="password" placeholder="Senha" onChange={(e) => { setPassword(e.target.value) }}/>

                            <footer>
                                <button type="button" className="btn btn-blue btn-block" onClick={() => {
                                    updateUser({
                                        token: userLocalstg.token,
                                        user_id: userLocalstg.user_id,
                                        name: name,
                                        lastName: lastName,
                                        mobilePhone: mobilePhone,
                                        email: email,
                                        password: password,
                                    })
                                }}>Atualizar</button>
                            </footer>
                        </form>
                    </div>
                </Col>
            </div>
        </div>
    )
}
