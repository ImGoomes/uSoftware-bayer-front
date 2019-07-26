import React from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

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
            password: ''
        }
    }

    render(){
        return(
            <div>
                <form>
                    <input type="text" id="name" placeholder="Nome" value={this.state.name} onChange={this.setName}/>
                    <input type="text" id="lastName" placeholder="lastName" value={this.state.lastName} onChange={this.setLastName}/>
                    <input type="number" id="age" placeholder="Idade" value={this.state.age} onChange={this.setAge}/>
                    <input type="text" id="mobilePhone" placeholder="Celular" value={this.state.mobilePhone} onChange={this.setMobilePhone}/>
                    <input type="text" id="email" placeholder="E-mail" value={this.state.email} onChange={this.setEmail}/>
                    <input type="password" id="password" placeholder="Senha" value={this.state.password} onChange={this.setPassword}/>
                    
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

    signUp = async props => {
        try {
            console.log({   })
            const signUp = await axios.post(`${process.env.REACT_APP_API_ADDRESS}/signup`, {...this.state})            
            console.log(signUp)
            alert('Cadastro realizado com sucesso. Você será redirecionado para a tela de login')
            this.props.history.push('/signin')
        } catch (error) {
            console.log(error)
            alert(error.message)
        }
    }

}