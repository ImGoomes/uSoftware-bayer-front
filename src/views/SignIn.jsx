import React from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import './../css/signin.css'


export default class SignIn extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: ''
        }
    }

    render(){
        return (
            <div className="container d-flex justify-content-center mt-5">
                <div className="box width-signin">
                    <div className="brand">
                        <i className="pe-7s-portfolio"></i>
                        <span className="nome-projeto text-danger">u.Job</span>
                    </div>
                    <form className="form">
                        <label className="control-label">E-mail</label>
                        <input type="text" className="form-control mb-2" id="email" placeholder="e-mail" value={this.state.email} onChange={this.setEmail}/>
                        <label className="control-label">Password</label>
                        <input type="password" className="form-control mb-2" id="password" placeholder="password" value={this.state.password} onChange={this.setPassword}/>
                        <hr />
                        <button type="button" className="btn btn-blue btn-block" onClick={this.signIn}>Entrar</button>
                        <Link className="btn btn-blue btn-block" to="/signup">Registrar</Link>
                    </form>
                </div>
            </div>
        )
    }

    componentDidMount(){

    }

    componentWillUnmount(){

    }

    setEmail = props => this.setState({
            email:props.target.value
        }, ()=>console.log(`e-mail: ${this.state.email}`))

    setPassword = props => this.setState({
            password:props.target.value
        }, ()=>console.log(`password: ${this.state.password}`))

    checkForm = _ => {
        if(this.state.email === '')
            throw new Error('Email é um campo obrigatório')
        else if(this.state.password === '')
            throw new Error('Senha é um campo obrigatório')
        
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!re.test(String(this.state.email).toLowerCase()))
            throw new Error('O e-mail fornecido não é válido')
    }

    signIn = async _ => {
        try {
            //Verificação do formulário
            this.checkForm()

            const signIn = await axios.post(`${process.env.REACT_APP_API_ADDRESS}/signin`, {...this.state})
            alert('Credenciais corretas. Seja bem-vindo')

            localStorage.setItem('signinData', JSON.stringify(signIn.data))
            this.props.history.push('/signup')//Alterar URL

        } catch (error) {
            console.log(error)
            localStorage.removeItem('signin')

            //Se não é um erro de rede | Banco de dados ou back-end
            if(error.response === undefined){
                alert(error.message)
                return
            }

            //Se é um erro da banco de dados ou back-end
            switch(error.response.status){
                case 404:
                    alert('e-mail ou senha incorretos')
                    break;
                case 500:
                    alert('ocorreu um erro de resposabilidade do servidor')
                    break;
                default:
                    alert(error.message)
                    break;
            }
        }
    }
}
