import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import Nav from './Nav/nav'
import Pane from './Pane/pane'
import Pages from './Pages/pages'
import './dashboard.scss'

class Dashboard extends Component {

    UNSAFE_componentWillMount() {
        if(!this.props.user.isAuth)
            this.props.history.push('/login')
    }

    UNSAFE_componentWillUpdate() {
        if(!this.props.user.isAuth)
            this.props.history.push('/login')
    }

    render() {
        const dashboard = this.props.strings.dashboard
        const { prefs, changeUser, user } = this.props

        return (
            <div className="Dashboard" 
                dir={prefs.lang ? 'rtl':'ltr'}
                style={{ 
                    background: prefs.theme? 
                    'rgba(255, 255, 255, 0.95)':
                    'rgba(0, 0, 0, 0.75)' 
                }}
            >
                <Nav dashboard={dashboard} prefs={prefs} changeUser={changeUser}/>
                <Pages dashboard={dashboard} prefs={prefs}/>
                <Pane dashboard={dashboard} prefs={prefs} user={user}/>
            </div>
        );
    }
}

export default withRouter(Dashboard);