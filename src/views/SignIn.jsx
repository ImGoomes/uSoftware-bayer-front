import React from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'


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
            <div>
                <form>
                    <input type="text" id="email" placeholder="e-mail" value={this.state.email} onChange={this.setEmail}/>
                    <input type="password" id="password" placeholder="password" value={this.state.password} onChange={this.setPassword}/>
                    <button type="button" onClick={this.signIn}>Entrar</button>
                    <Link to="/signup">Registrar</Link>
                </form>
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

    signIn = async props => {
        try {
            const signIn = await axios.post(`${process.env.REACT_APP_API_ADDRESS}/signin`, {...this.state})
            alert('Credenciais corretas. Seja bem-vindo')
            localStorage.setItem('signin', JSON.stringify({token: signIn.data}))
            this.props.history.push('/signup')//Refactor

        } catch (error) {
            console.log(error)
            localStorage.removeItem('signin')
            const errorMessage = error.response.data.message

            switch(error.response.status){
                case 404:
                    alert('e-mail ou senha incorretos')
                    console.error(errorMessage)
                    break;
                case 500:
                    alert('ocorreu um erro de resposabilidade do servidor')
                    console.error(errorMessage)
                    break;
                default:
                    //refactor
                    break;
            }
        }
    }
}