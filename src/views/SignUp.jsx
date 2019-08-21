import React from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import InputMask from 'react-input-mask'
import PropTypes from 'prop-types'
import CssBaseline from '@material-ui/core/CssBaseline'
import { withStyles } from '@material-ui/styles'
import {Box, Container, Grid, Button, Card, TextField} from "@material-ui/core"

const styles = theme => ({
    titleHeader: {
      fontFamily: 'Roboto',
    },
    card: {
        minWidth: 275,
        maxWidth: 500,
        padding: '20px',
        margin: '0 auto',
        marginTop: '20px',
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    textField: {
        width: '100%',

    },
    brandIcon: {
        fontSize: '12px'
    }
});

class SignUp extends React.Component{
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
        const { classes } = this.props;
        return(
            <React.Fragment>
                <CssBaseline />
                {<Container max-width="sm">
                    <Card className={classes.card}>
                        <form className="form">
                            <h2 className={classes.titleHeader}>Registre-se</h2>
                            <TextField id="name" label="Nome" className={classes.textField} value={this.state.name}
                                onChange={this.setName} margin="normal" variant="outlined" />
                            <TextField id="lastName" label="Sobrenome" className={classes.textField} value={this.state.lastName}
                                       onChange={this.setLastName} margin="normal" variant="outlined" />
                            <TextField id="age" label="Idade" className={classes.textField} value={this.state.age} type="number"
                                       onChange={this.setAge} margin="normal" variant="outlined" />

                            <InputMask
                                mask="(99) 99999-9999"
                                value={this.state.mobilePhone}
                                onChange={this.setMobilePhone}
                                className={classes.textField}
                            >
                                {() => <TextField
                                    variant="outlined" className={classes.textField} label="Celular"/>}
                            </InputMask>
                            <TextField id="email" label="E-mail" type="email" className={classes.textField} value={this.state.email}
                                       onChange={this.setEmail} margin="normal" variant="outlined" />
                            <TextField id="password" label="Senha" type="password" className={classes.textField} value={this.state.password}
                                       onChange={this.setPassword} margin="normal" variant="outlined" />
                            <TextField id="passwordConfirmation" label="Confirmação de Senha" type="password" className={classes.textField} value={this.state.passwordConfirmation}
                                       onChange={this.setPasswordConfirmation} margin="normal" variant="outlined" />

                            <Button variant="contained" color="primary" type="button" className="btn-block" onClick={this.signUp}>Registrar</Button>
                            <Button variant="contained" color="primary" component={Link} className="btn-block" to="/signin">Entrar</Button>
                        </form>
                    </Card>
                </Container>}
            </React.Fragment>
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

export default withStyles(styles)(SignUp)