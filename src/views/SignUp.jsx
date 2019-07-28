import React from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import InputMask from 'react-input-mask'

export default class SignIn extends React.Component{
    constructor(props){
        super(props)
        
        this.state = {
            name: '',
            lastName: '',
            age: 0,
            address: '',
            mobilePhone: '',
            email: '',
            password: '',
            passwordConfirmation: ''
        }
    }

    render(){
        return(
            <div>
                <form>
                    <input type="text" id="name" placeholder="Nome" value={this.state.name} onChange={this.setName}/>
                    <input type="text" id="lastName" placeholder="Sobrenome" value={this.state.lastName} onChange={this.setLastName}/>
                    <input type="number" id="age" placeholder="Idade" value={this.state.age} onChange={this.setAge}/>
                    <InputMask mask="(99) 99999-9999" maskChar=" " placeholder="Celular" value={this.state.mobilePhone} onChange={this.setMobilePhone}/>                    
                    <input type="email"  id="email" placeholder="E-mail" value={this.state.email} onChange={this.setEmail}/>
                    <input type="password" id="password" placeholder="Senha" value={this.state.password} onChange={this.setPassword}/>
                    <input type="password" id="passwordConfirmation" placeholder="Confirmação de Senha" value={this.state.passwordConfirmation} onChange={this.setPasswordConfirmation}/>
                    
                    <button type="button" onClick={this.signUp}>Registrar</button>
                    <Link to="/signin">Entrar</Link>
                </form>
            </div>
        )
    }

    componentDidMount(){

    }

    componentWillUnmount(){

    }

    setName = props => {
        this.setState({name: props.target.value},
            ()=>console.log(this.state))
    }
    
    setLastName = props => {
        this.setState({lastName: props.target.value},
            ()=>console.log(this.state))
    }
    
    setAge = props =>{
        const age = parseInt(props.target.value)
        if(age < 0 || age > 100)
            return

        this.setState({age: age},
            ()=>console.log(this.state))
    }
    
    setAddress = props => {
        this.setState({address: props.target.value},
            ()=>console.log(this.state))
    }
    
    setMobilePhone = props => {
        this.setState({mobilePhone: props.target.value},
            ()=>console.log(this.state))
    }
    
    setEmail = props =>{
        this.setState({email: props.target.value},
            ()=>console.log(this.state))
    }

    setPassword = props => {
        this.setState({password: props.target.value},
            ()=>console.log(this.state))
    }

    setPasswordConfirmation = props => {
        this.setState({passwordConfirmation: props.target.value},
            ()=>console.log(this.state))
    }

    checkForm = _ => {
        if(this.state.name === '')
            throw new Error('Nome é um campo obrigatório')
        else if(this.state.lastName === '')
            throw new Error('Sobrenome é um campo obrigatório')
        else if(this.state.age === 0)
            throw new Error('Idade é um campo obrigatório')
        // else if(this.state.address === '')
            // throw new Error('Endereço é um campo obrigatório')
        // else if(this.state.mobilePhone === '')
        //     throw new Error('Celular é um campo obrigatório')
        else if(this.state.email === '')
            throw new Error('Email é um campo obrigatório')
         else if(this.state.password === '')
             throw new Error('Senha é um campo obrigatório')
        else if(this.state.passwordConfirmation === '')
            throw new Error('Confimação de Senha é um campo obrigatório')
        else if(this.state.password !== this.state.passwordConfirmation)
            throw new Error('A senha e sua confirmação devem ser examente iguais')
        
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if(!re.test(String(this.state.email).toLowerCase()))
            throw new Error('O e-mail fornecido não é válido')
    }

    signUp = async props => {
        try {
            //Verificando se o formulário está preenchido corretamente
            this.checkForm()
            
            //Chamada para o back-end
            const signUp = await axios.post(`${process.env.REACT_APP_API_ADDRESS}/signup`, {...this.state})            
            
            console.log(signUp)
            alert('Cadastro realizado com sucesso. Você será redirecionado para a tela de login')
            
            //Alterando a URL sem dar o load na página
            this.props.history.push('/signin') //Alterar a URL
        } catch (error) {
            console.log(error)
            alert(error.message)
        }
    }

}