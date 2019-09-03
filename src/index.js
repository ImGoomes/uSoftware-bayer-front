import React from 'react'
import ReactDOM from 'react-dom'
import SignIn from './views/SignIn'
import SignUp from './views/SignUp'
import MainRecruiter from './views/MainRecruiter'
import MainCandidate from './views/MainCandidate'
import { Router, Switch, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap'
import 'jquery-confirm/dist/jquery-confirm.min'
import 'jquery-confirm/dist/jquery-confirm.min.css'
import 'popper.js/dist/popper'

import dotenv from 'dotenv'
dotenv.config()

ReactDOM.render(
    <Router history={createBrowserHistory()}>
        <Switch>
            <Route path="/" component={SignIn} exact={true} />
            <Route path="/signin" component={SignIn} exact={true} />
            <Route path="/signup" component={SignUp} exact={true} />
            <Route path="/mainrecruiter" component={MainRecruiter} exact={true} />
            <Route path="/maincandidate" component={MainCandidate} exact={true} />
        </Switch>
    </Router>, document.getElementById('root')
);
