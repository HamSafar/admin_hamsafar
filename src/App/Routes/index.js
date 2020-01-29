import React, { Component } from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'

import Login from './Login'
import Dashboard from './Dashboard'
import About from './About'
import NotFound from './NotFound'

class Routes extends Component { 


    render() {

        return (
            <Switch>
                <Route path="/about" component={About} />
                <Route path="/dashboard/:name" exact component={Dashboard} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/login" component={Login} />
                
                {
                    (!this.props.user) ?
                    <Redirect path="/" exact to="/login" /> :
                    <Redirect path="/" exact to="/dashboard" />
                }
                
                <Route component={NotFound} />
            </Switch>
        )
    }
}

export default Routes;