import React, { Component } from 'react'
import Axios from 'axios'

import manifset from '../../../static/manifset.json'

import { Ripple } from '@progress/kendo-react-ripple';

import './styles.scss'

class Login extends Component {

    state = {
        lang: this.props.prefs.lang,
        username: '',
        password: ''
    }

    toggleLang = (e,lang) => this.props.changePrefs({ lang })

    handleSelect = (e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.75)'
    handleBlur = (e) => e.target.style.backgroundColor = 'transparent'

    handleChange = (e) => {
        if(e.target.name === 'username')
            return this.setState({ username: e.target.value })
        if(e.target.name === 'password')
            return this.setState({ password: e.target.value })
    }

    login = () => {
        const { username, password } = this.state
        Axios.post('/user/login', {
            username, password
        }).then(
            res => console.log(res) //this.props.changeUser(res.data)
        ).catch(
            e => console.log(e)
        )
    }

    render() {
        const { lang } = this.state
        const { strings: { login } } = this.props
        console.log(this.state.username)

        return (
            <div className="Login">
                <div className="form">
                    <div className="logo">
                        <img src={window.location.origin + manifset.icons[2].src} alt="logo"/>
                    </div>
                    <div className="title">
                        {login.title[lang]}
                    </div>
                    <div className="inputs">
                        <div className="input"
                            dir={lang? "rtl":"ltr"}
                        >
                            <img alt={login.username[lang]} 
                                src={window.location.origin + '/assets/login/user-solid.svg'} 
                            />
                            <input type="text" name="username" 
                                placeholder={login.username[lang]} 
                                onSelect={e => this.handleSelect(e)}
                                onBlur={e => this.handleBlur(e)}
                                onChange={e => this.handleChange(e)}
                            ></input>
                        </div>
                        <div className="input"
                            dir={lang? "rtl":"ltr"}
                        >
                            <img alt={login.password[lang]} 
                                src={window.location.origin + '/assets/login/lock-solid.svg'} 
                            />
                            <input type="password" name="password" 
                                placeholder={login.password[lang]} 
                                onSelect={e => this.handleSelect(e)}
                                onBlur={e => this.handleBlur(e)}
                                onChange={e => this.handleChange(e)}
                            ></input>
                        </div>
                    </div>
                    <Ripple>
                        <button className="k-button k-primary mt-1 mb-1 button" onClick={e => this.login}>
                            {login.login[lang]}
                        </button>
                    </Ripple>
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