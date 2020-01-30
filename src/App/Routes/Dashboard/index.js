import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import Nav from './nav'
import Pane from './pane'
import Page from './page'
import './styles.scss'

class Dashboard extends Component {

    UNSAFE_componentWillMount() {
        if(!this.props.user.isAuth)
            this.props.history.push('/login')
    }

    render() {
        return (
            <div className="Dashboard">
                <Nav  />
                <Page />
                <Pane />
            </div>
        );
    }
}

export default withRouter(Dashboard);