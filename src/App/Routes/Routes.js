import React, { Component } from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'

import Login from './Login/login'
import Dashboard from './Dashboard/dashboard'
import About from './About'
import NotFound from './NotFound'
import Loading from './Loading/loading'

class Routes extends Component { 

    withProps = (Comp) => (props) => 
        <Comp {...props}
            {...this.props.appState} 
            changePrefs={this.props.changePrefs} 
            changeUser={this.props.changeUser}
            changeProfile={this.props.changeProfile}
            logout={this.props.logout}
            strings={this.props.strings}
            //cookies={this.props.cookies}
        />

    render() {
        const { withProps } = this

        // limit dashboard routes in future
        return (
            <Switch>

                {
                    (this.props.appState.user.isAuth)?
                    <Redirect from="/login" to="/dashboard" /> :
                    <Redirect from="/dashboard" to="/login" /> 
                }

                <Route path="/about" exact component={withProps(About)} />
                <Route path="/dashboard/:name" exact component={withProps(Dashboard)} /> 
                <Redirect from="/dashboard" exact to="/dashboard/home" />
                <Route path="/login" exact component={withProps(Login)} />
                
                <Redirect from="/" exact to="/loading" />
                <Route path="/loading" exact component={withProps(Loading)} />
                <Route component={withProps(NotFound)} />
            </Switch>
        )
    }
}

export default Routes;