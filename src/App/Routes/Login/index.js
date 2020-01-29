import React, { Component } from 'react'

import manifset from '../../../static/manifset.json'
import { login as strings } from '../../../static/strings.json'

import './styles.scss'

class Login extends Component {

    state = {
        lang: 1
    }

    toggleLang = (e,lang) => this.setState({ lang })

    handleSelect = (e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.75)'
    handleBlur = (e) => e.target.style.backgroundColor = 'transparent'

    login = () => {

    }

    render() {
        const lang = this.state.lang

        return (
            <div className="Login">
                <div className="form">
                    <div className="logo">
                        <img src={window.location.origin + manifset.icons[1].src} alt="logo"/>
                    </div>
                    <div className="title">
                        {strings.title[lang]}
                    </div>
                    <div className="inputs">
                        <input type="text" name="username" 
                            placeholder={strings.username[lang]} 
                            dir={lang? "rtl":"ltr"}
                            onSelect={e => this.handleSelect(e)}
                            onBlur={e => this.handleBlur(e)}
                        ></input>
                        <input type="password" name="password" 
                            placeholder={strings.password[lang]} 
                            dir={lang? "rtl":"ltr"}
                            onSelect={e => this.handleSelect(e)}
                            onBlur={e => this.handleBlur(e)}
                        ></input>
                    </div>
                    <button className="button" onClick={e => this.login}>
                        {strings.login[lang]}
                    </button>
                </div>

                <div className="footer">
                    <span onClick={(e)=>this.toggleLang(e,0)}>En</span>
                    &nbsp;|&nbsp;
                    <span onClick={(e)=>this.toggleLang(e,1)}>Fa</span>
                </div>
            </div>
        );
    }
}

export default Login;