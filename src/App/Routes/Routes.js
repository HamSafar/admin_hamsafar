import React, { Component } from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'

import Login from './Login/login'
import Dashboard from './Dashboard/dashboard'
import About from './About'
import NotFound from './NotFound/not-found'
import Loading from './Loading/loading'

class Routes extends Component {

    withProps = (Comp) => (props) =>
        <Comp {...props}
            {...this.props.appConfig}
            changeUser={this.props.changeUser}
            changeProfile={this.props.changeProfile}
            changePlace={this.props.changePlace}
            logout={this.props.logout}
            strings={this.props.strings}
        />

    render() {
        const { withProps } = this

        // limit dashboard routes in future
        // make app hoc of routes and use <Route /> inside of it
        // so that in any route u will have your dashboard
        // then make that a container so it gets aware of the history pathname
        return (
            <Switch>

                {
                    (this.props.appConfig.appMounted) ? (
                        (this.props.appConfig.user.isAuth) ?
                            <Redirect from="/login" to="/dashboard" /> :
                            <Redirect from="/dashboard" to="/login" />
                    ) : null //can be used for loading
                }

                <Route path="/about" exact component={withProps(About)} />
                <Route path="/dashboard/:name" exact component={withProps(Dashboard)} />
                <Redirect from="/dashboard" exact to="/dashboard/home" />
                <Route path="/login" exact component={withProps(Login)} />
                <Route path="/loading" exact component={withProps(Loading)} />

                <Redirect from="/" exact to="/loading" />
                <Route component={withProps(NotFound)} />
            </Switch>
        )

    }
}

export default Routes