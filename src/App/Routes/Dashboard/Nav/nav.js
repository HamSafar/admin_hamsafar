import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faHome, faTasks, faChartBar, faChartPie, faEnvelope, faUser, faCog, faSignOutAlt
} from '@fortawesome/free-solid-svg-icons'

import manifset from '../../../../static/manifset.json'
import './nav.scss'

// Home, Charts(by date), Analytics, Mailbox, Account(personal data, wallet, plan), Settings(theme, lang, )

class Nav extends Component {

    render() {
        const { prefs: { lang, theme }, dashboard } = this.props

        return (
            <div className="Nav" 
                style={ theme? 
                    {
                        background: 'rgb(51, 42, 124)'
                    }:{
                        background: 'linear-gradient(rgb(38, 202, 217), rgb(157, 40, 196))'
                    }
                }
            >
                <div className="logo">
                    <img src={window.location.origin + manifset.icons[2].src } alt="logo"/>
                    <span>Ham Safar</span>
                </div>
                <div className="icons">
                    <NavLink to="/dashboard/home" className="icon" activeClassName="icon-active" >
                        <FontAwesomeIcon icon={faHome} size="lg" title={dashboard.home && dashboard.home.title[lang]} />
                        <div className="line" style={lang? { left: 0 }:{ right: 0 }} />
                    </NavLink>
                    <NavLink to="/dashboard/manage" className="icon" activeClassName="icon-active" >
                        <FontAwesomeIcon icon={faTasks} size="lg" title={dashboard.manage && dashboard.manage.title[lang]} />
                        <div className="line" style={lang? { left: 0 }:{ right: 0 }} />
                    </NavLink>
                    <NavLink to="/dashboard/charts" className="icon" activeClassName="icon-active">
                        <FontAwesomeIcon icon={faChartBar} size="lg" title={dashboard.charts && dashboard.charts.title[lang]} />
                        <div className="line" style={lang? { left: 0 }:{ right: 0 }} />
                    </NavLink>
                    <NavLink to="/dashboard/analytics" className="icon" activeClassName="icon-active">
                        <FontAwesomeIcon icon={faChartPie} size="lg" title={dashboard.analytics && dashboard.analytics.title[lang]} />
                        <div className="line" style={lang? { left: 0 }:{ right: 0 }} />
                    </NavLink>
                    <NavLink to="/dashboard/mailbox" className="icon" activeClassName="icon-active">
                        <FontAwesomeIcon icon={faEnvelope} size="lg" title={dashboard.mailbox && dashboard.mailbox.title[lang]} />
                        <div className="line" style={lang? { left: 0 }:{ right: 0 }} />
                    </NavLink>
                    <NavLink to="/dashboard/account" className="icon" activeClassName="icon-active">
                        <FontAwesomeIcon icon={faUser} size="lg" title={dashboard.account && dashboard.account.title[lang]} />
                        <div className="line" style={lang? { left: 0 }:{ right: 0 }} />
                    </NavLink>
                    <NavLink to="/dashboard/settings" className="icon" activeClassName="icon-active">
                        <FontAwesomeIcon icon={faCog} size="lg" title={dashboard.settings && dashboard.settings.title[lang]}  />
                        <div className="line" style={lang? { left: 0 }:{ right: 0 }} />
                    </NavLink>
                </div>
                <div className="signout" onClick={()=>this.props.logout()}>
                    <FontAwesomeIcon icon={faSignOutAlt} size="lg" />
                </div>
            </div>
        );
    }
}

export default withRouter(Nav);