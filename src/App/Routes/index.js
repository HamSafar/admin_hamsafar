import React, { Component } from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'

import Login from './Login'
import Dashboard from './Dashboard'
import About from './About'
import NotFound from './NotFound'

class Routes extends Component { 

    withProps = (Comp) => (props) => 
        <Comp {...props} 
            lang={this.props.prefs.lang} 
            changePrefs={this.props.changePrefs} 
        />

    render() {
        const { withProps } = this

        return (
            <Switch>
                <Route path="/about" exact component={withProps(About)} />
                <Route path="/dashboard/:name" exact component={withProps(Dashboard)} />
                <Route path="/dashboard" exact component={withProps(Dashboard)} />
                <Route path="/login" exact component={withProps(Login)} />
                
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