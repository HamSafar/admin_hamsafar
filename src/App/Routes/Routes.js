import React, { Component } from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'

import Login from './Login/login.container'
import Dashboard from './Dashboard/dashboard'
import About from './About'
import NotFound from './NotFound/not-found'

class Routes extends Component {

    withProps = (Comp) => (props) =>
        <Comp {...props}
            {...this.props.appConfig}
            logout={this.props.logout}
            strings={this.props.strings}
        />

    render() {
        const { withProps } = this
        const { appConfig: { user: { isAuth } } } = this.props

        // limit dashboard routes in future
        // make app hoc of routes and use <Route /> inside of it
        // so that in any route u will have your dashboard
        // then make that a container so it gets aware of the history pathname
        return (
            <Switch>
                {
                    isAuth
                    ? <Redirect from="/login" to="/dashboard" />
                    : <Redirect from="/dashboard" to="/login" />
                }
                
                <Route path="/about" exact component={withProps(About)} />
                <Route path="/dashboard/:name" exact component={withProps(Dashboard)} />
                <Redirect from="/dashboard" exact to="/dashboard/home" />
                <Route path="/login" exact component={withProps(Login)} />

                <Redirect exact from="/" to="/login" />
                <Route component={withProps(NotFound)} />
            </Switch>
        )

    }
}

export default Routes