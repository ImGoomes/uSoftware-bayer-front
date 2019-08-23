import React from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import PropTypes from 'prop-types'
import CssBaseline from '@material-ui/core/CssBaseline'
import { withStyles } from '@material-ui/styles'
import {Box, Container, Grid, Button, Card, TextField} from "@material-ui/core"

const styles = theme => ({
    card: {
        minWidth: 275,
        maxWidth: 350,
        padding: '20px',
        margin: '0 auto',
        marginTop: '100px',
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
    },
    button: {
        width: '100%',
        marginTop: '5px',
        '&:hover': {
            color: "#fff",
        }
    }
});

class SignIn extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: ''
        }
    }

    render(){
        const { classes } = this.props;
        return (
            <React.Fragment>
                <CssBaseline />
                {<Container max-width="sm">
                        <Card className={classes.card}>
                            <i className="pe-7s-portfolio" style={{fontSize: '32px'}}></i>
                            <span className="nome-projeto text-danger">u.Job</span>

                            <form className="form">
                                <TextField
                                    id="email"
                                    label="Email"
                                    className={classes.textField}
                                    value={this.state.email}
                                    onChange={this.setEmail}
                                    margin="normal"
                                    variant="outlined"
                                />
                                <TextField
                                    id="password"
                                    label="Senha"
                                    className={classes.textField}
                                    value={this.state.password}
                                    onChange={this.setPassword}
                                    margin="normal"
                                    variant="outlined"
                                    type="password"
                                />
                                <hr />
                                <Grid container direction="row" justify="space-around" alignItems="center">
                                    <Button size="large" variant="contained" color="primary" className="btn-block" onClick={this.signIn}>Entrar</Button>
                                    <Button size="large" variant="contained" color="primary" className={classes.button} component={Link} to="/signup">Registrar</Button>
                                </Grid>
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

SignIn.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignIn)