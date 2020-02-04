import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-regular-svg-icons'
import { faMapMarkerAlt, faSync } from '@fortawesome/free-solid-svg-icons'

import './pane.scss'

class Pane extends Component {

    render() {
        const { prefs: { lang }, profile, city } = this.props

        return (
            <div className="Pane" 
                dir={lang ? "ltr":"rtl"}
                style={ lang? { left: 0 }:{ right: 0 } }
            >
                <div className="avatar">
                    <img alt="Avatar" src="https://lh3.googleusercontent.com/-xuFLlo7klRU/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rd2G6mw6iRAamWTHjSF4HNcSi1Ohg/photo.jpg?sz=46"/>
                    <span> &nbsp; {profile && profile.companyName} &nbsp; </span>
                </div>
                <div className="icon">
                    <FontAwesomeIcon icon={faBell} size="lg" />
                </div>
                <div className="icon">
                    <FontAwesomeIcon icon={faSync} size="lg" />
                </div>
                <div className="icon">
                    <span> {city.names? city.names[lang] : ''} </span>
                    <FontAwesomeIcon icon={faMapMarkerAlt} size="lg" />
                </div>
            </div>
        );
    }
}

export default Pane;