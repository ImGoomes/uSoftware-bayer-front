import React from 'react';
import ReactDOM from 'react-dom';
import SignIn from './views/SignIn';
import SignUp from './views/SignUp';
import {Router, Switch, Route} from 'react-router-dom'
import {createBrowserHistory} from 'history'

import dotenv from 'dotenv'
dotenv.config()

ReactDOM.render(<Router history={createBrowserHistory()}>
                    <Switch>
                        <Route path="/" component={SignIn} exact={true}/>
                        <Route path="/signin" component={SignIn} exact={true}/>
                        <Route path="/signup" component={SignUp} exact={true}/>
                    </Switch>
                </Router>, document.getElementById('root'));