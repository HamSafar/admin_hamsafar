import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import Nav from './Nav/nav'
import Pane from './Pane/pane'
import Pages from './Pages/pages'
import './dashboard.scss'

class Dashboard extends Component {

    render() {
        const dashboard = this.props.strings.dashboard
        const { place, prefs, changePrefs, user, /* changeUser,  */profile, changeProfile, logout } = this.props

        return (
            <div className="Dashboard" 
                dir={prefs.lang ? 'rtl':'ltr'}
                style={{ 
                    background: prefs.theme? 
                    'rgba(255, 255, 255, 0.85)':
                    'rgba(14, 19, 23, 0.95)' 
                }}
            >
                <Nav dashboard={dashboard} prefs={prefs} logout={logout} />
                <Pages 
                    dashboard={dashboard} 
                    prefs={prefs} changePrefs={changePrefs} 
                    profile={profile} changeProfile={changeProfile}
                    user={user}
                />
                <Pane dashboard={dashboard} prefs={prefs} user={user} profile={profile} place={place} />
            </div>
        );
    }
}

export default withRouter(Dashboard);