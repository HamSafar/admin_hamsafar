import React, { Component } from 'react';
import { Button } from 'semantic-ui-react'

import './settings.scss'

class Settings extends Component {

    toggleAutoLogin = (autoLogin) => this.props.changePrefs({ autoLogin: !autoLogin })
    changeTheme = (theme) => this.props.changePrefs({ theme })
    changeLang = (lang) => this.props.changePrefs({ lang })

    render() { 
        const { prefs: { autoLogin, lang }, strings } = this.props
        const active = autoLogin;
        return (
            <div className="Settings">
                <div className="content" style={{ textAlign: lang? 'right':'left' }}>
                    <div className="element">
                        <span> {strings.language[lang]} </span>
                        <div className="button">
                            <Button.Group size='small'>
                                <Button onClick={()=>this.changeLang(1)}
                                    style={{ 
                                        backgroundColor: 'rgba(138, 86, 172,0.85)', 
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
                        <span> {strings.theme.title[lang]} </span> 
                        <div className="button">
                            <Button.Group size='small'>
                                <Button onClick={()=>this.changeTheme(1)}
                                    style={{ backgroundColor: 'rgba(138, 86, 172,0.85)' }}
                                >
                                    {strings.theme.light[lang]}
                                </Button>
                                <Button.Or />
                                <Button onClick={()=>this.changeTheme(0)}
                                    style={{backgroundColor: 'rgba(99,99,99,0.85)'}}
                                >
                                    {strings.theme.dark[lang]}
                                </Button>
                            </Button.Group>
                        </div>
                    </div>
                    <div className="element autoLogin">
                        <div className="button">
                            <Button toggle active={active} onClick={()=>this.toggleAutoLogin(active)}>
                                {strings.auto_login[lang]}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Settings;