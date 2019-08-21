import React from 'react';
import ReactDOM from 'react-dom';
import SignIn from './views/SignIn';
import SignUp from './views/SignUp';
import MainRecruiter from './views/MainRecruiter';
import MainCandidate from './views/MainCandidate';
import {Router, Switch, Route} from 'react-router-dom'
import {createBrowserHistory} from 'history'
import 'bootstrap/dist/css/bootstrap.css';

import dotenv from 'dotenv'
dotenv.config()

const renderPrivateComponent = _ => {
    try {
        let signInData = JSON.parse(localStorage.getItem('siginInData'))
        
        switch(signInData.role){
            case 'recruiter':
                return MainRecruiter
            case 'user':
                return MainCandidate
            default:
                return SignIn
            }
        } catch (error) {
            return SignIn            
    }
}

ReactDOM.render(<Router history={createBrowserHistory()}>
                    <Switch>
                        <Route path="/" component={SignIn} exact={true}/>
                        <Route path="/signin" component={SignIn} exact={true}/>
                        <Route path="/signup" component={SignUp} exact={true}/>
                        <Route path="/main" component={renderPrivateComponent()} exact={true}/>
                    </Switch>
                </Router>, document.getElementById('root'));