import React, { Component } from 'react';
import { Button } from 'semantic-ui-react'

import './settings.scss'
import strings from '../../../../../static/string.scss'

const settings

class Settings extends Component {

    toggleAutoLogin = (autoLogin) => this.props.changePrefs({ autoLogin: !autoLogin })
    changeTheme = (theme) => this.props.changePrefs({ theme })
    changeLang = (lang) => this.props.changePrefs({ lang })

    render() { 
        const { prefs: { autoLogin, lang } } = this.props
        const active = autoLogin;
        return (
            <div className="Settings">
                <div className="content" style={{ textAlign: lang? 'right':'left' }}>
                    <div className="element">
                        <span> Language </span>
                        <div className="button">
                            <Button.Group size='small'>
                                <Button onClick={()=>this.changeLang(1)}
                                    style={{ 
                                        backgroundColor: 'rgba(138, 86, 172,0.85)', 
                                        fontFamily: 'Vazir'
                                    }}
                                >
                                    فا
                                </Button>
                                <Button.Or />
                                <Button onClick={()=>this.changeLang(0)}
                                    style={{backgroundColor: 'rgba(99,99,99,0.85)'}}
                                >
                                    En
                                </Button>
                            </Button.Group>
                        </div>
                    </div>
                    <div className="element">
                        <span>Theme</span> 
                        <div className="button">
                            <Button.Group size='small'>
                                <Button onClick={()=>this.changeTheme(1)}
                                    style={{ backgroundColor: 'rgba(138, 86, 172,0.85)' }}
                                >
                                    Light
                                </Button>
                                <Button.Or />
                                <Button onClick={()=>this.changeTheme(0)}
                                    style={{backgroundColor: 'rgba(99,99,99,0.85)'}}
                                >
                                    Dark
                                </Button>
                            </Button.Group>
                        </div>
                    </div>
                    <div className="element autoLogin">
                        <div className="button">
                            <Button toggle active={active} onClick={()=>this.toggleAutoLogin(active)}>
                                Auto Login
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Settings;