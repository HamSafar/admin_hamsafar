import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import Nav from './Nav/nav'
import Pane from './Pane/pane'
import Pages from './Pages/pages'
import './styles.scss'

class Dashboard extends Component {

    UNSAFE_componentWillMount() {
        if(!this.props.user.isAuth)
            this.props.history.push('/login')
    }

    render() {
        const dashboard = this.props.strings.dashboard
        const { prefs } = this.props

        return (
            <div className="Dashboard" 
                dir={prefs.lang ? 'rtl':'ltr'}
                style={{ 
                    background: prefs.theme? 
                    'rgba(255, 255, 255, 0.95)':
                    'rgba(0, 0, 0, 0.75)' 
                }}
            >
                <Nav dashboard={dashboard} prefs={prefs}/>
                <Pages dashboard={dashboard} prefs={prefs}/>
                <Pane dashboard={dashboard} prefs={prefs}/>
            </div>
        );
    }
}

export default withRouter(Dashboard);