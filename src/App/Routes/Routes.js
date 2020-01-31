import React, { Component } from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'

import Login from './Login/login'
import Dashboard from './Dashboard/dashboard'
import About from './About'
import NotFound from './NotFound'

class Routes extends Component { 

    withProps = (Comp) => (props) => 
        <Comp {...props} 
            prefs={this.props.prefs} 
            user={this.props.user}
            changePrefs={this.props.changePrefs} 
            changeUser={this.props.changeUser}
            strings={this.props.strings}
            //cookies={this.props.cookies}
        />

    render() {
        const { withProps } = this

        // limit dashboard routes in future
        return (
            <Switch>
                <Route path="/about" exact component={withProps(About)} />
                <Route path="/dashboard/:name" exact component={withProps(Dashboard)} /> 
                <Redirect from="/dashboard" exact to="/dashboard/home" />
                <Route path="/login" exact component={withProps(Login)} />
                
                {
                    (!this.props.user.isAuth) ?
                    <Redirect path="/" exact to="/login" /> :
                    <Redirect path="/" exact to="/dashboard" />
                }
                
                <Route component={withProps(NotFound)} />
            </Switch>
        )
    }
}

export default Routes;