import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import Nav from './nav'
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
                
            </div>
        );
    }
}

export default withRouter(Dashboard);