import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-regular-svg-icons'
import { faMapMarkerAlt, faSync } from '@fortawesome/free-solid-svg-icons'

import './pane.scss'
import MenuButton from '../../../Components/MenuButton/MenuButton'

class Pane extends Component {

    
    render() {
        const { prefs: { lang, theme }, user, place, changePlace } = this.props

        return (
            <div className="Pane" 
                dir={lang ? "ltr":"rtl"}
                style={ lang? { left: 0 }:{ right: 0 } }
            >
                <div className="avatar">
                    <img alt="Avatar" src="https://lh3.googleusercontent.com/-xuFLlo7klRU/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rd2G6mw6iRAamWTHjSF4HNcSi1Ohg/photo.jpg?sz=46"/>
                    <span> &nbsp; {user && user.name} &nbsp; </span>
                </div>
                <div className="icon">
                    <FontAwesomeIcon icon={faBell} size="lg" />
                </div>
                <div className="icon">
                    <FontAwesomeIcon icon={faSync} size="lg" />
                </div>
                <div className="places">
                    <MenuButton list={user && user.places} 
                        index={place && place.index} 
                        setIndex={index => changePlace({ index })}
                        lang={lang} theme={theme} 
                        title={[ 'محل ها', 'Places' ]} 
                    />
                </div>
                <div className="icon">
                    <FontAwesomeIcon icon={faMapMarkerAlt} size="lg" />
                </div>
            </div>
        );
    }
}

export default Pane;