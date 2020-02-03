// hoc component

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'

import Home from './Home/home'
import Charts from './Charts/charts'
import Analytics from './Analytics/analytics'
import Mailbox from './Mailbox/mailbox'
import Account from './Account/account'
import Settings from './Settings/settings'

import './pages.scss'

class Pages extends Component {

    goBack = () => this.props.history.goBack()

    renderPage = (pathname) => {
        const { prefs } = this.props

        switch(pathname) {
            case 'home': return <Home prefs={prefs} />
            case 'charts': return <Charts prefs={prefs} />
            case 'analytics': return <Analytics prefs={prefs} />
            case 'mailbox': return <Mailbox prefs={prefs} />
            case 'account': return <Account prefs={prefs} />
            case 'settings': return <Settings prefs={prefs} />
            default: this.props.history.push('/login')
        }
    }

    render() {
        const { prefs: { lang } } = this.props
        const pathname = this.props.history.location.pathname.replace('/dashboard/','')
        const header = this.props.dashboard[pathname] && this.props.dashboard[pathname].title[lang]
        document.title = header && header.toUpperCase()

        return (
            <div className="Pages" >
                <div className="header">
                    <div className="backNav" onClick={()=>this.goBack()} style={{ visibility: ((pathname === 'home')? 'hidden':'visible') }}>
                        <FontAwesomeIcon icon={lang? faChevronRight:faChevronLeft} size="lg" />
                        <span> {header} </span>
                    </div>
                </div>
                <div className="page">
                    {this.renderPage(pathname)}
                </div>
            </div>
        );
    }
}

export default withRouter(Pages);