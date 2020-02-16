import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import manifest from '../../../static/manifest.json'

import { Ripple } from '@progress/kendo-react-ripple'; //change it to material-ui

import './login.scss'

class Login extends Component {

    state = {
        username: '',
        password: '',
        isInvalid: {
            username: true,
            password: true
        }
    }

    toggleLang = (e, lang) => this.props.changePrefs({ lang })

    handleSelect = (e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.75)'
    handleBlur = (e) => { if (!e.target.value) e.target.style.backgroundColor = 'transparent' }

    handleChange = (e) => {
        if (e.target.name === 'username')
            return this.setState({ username: e.target.value })

        if (e.target.name === 'password')
            return this.setState({ password: e.target.value })
    }

    validate = (e, s) => {
        if (s === 'username') {
            if (e.length < 4)
                return 'Username must be more than 6 characters'
            return undefined
        }
        if (s === 'password') {
            if (e.length < 4)
                return 'Password must be more than 6 characters'
            return undefined
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const { updateUser } = this.props
        var { username, password } = this.state

        const isInvalid = {
            username: this.validate(username, 'username'),
            password: this.validate(password, 'password')
        }

        if (!isInvalid.username && !isInvalid.password) {
            console.log('user@client updated')
            const user = { username, password }
            updateUser({ ...user })
        }

        this.setState({ isInvalid })
    }

    componentDidMount() {
        const { prefs: { lang }, strings: { login } } = this.props
        document.title = login.title[lang]
    }

    render() {
        const { username, password, isInvalid } = this.state
        const { prefs: { lang }, strings: { login } } = this.props

        process.env.NODE_ENV === 'development' && console.log('Login Rendered')
        
        return (
            <div className="Login">
                <form className="form"
                    onSubmit={e => this.handleSubmit(e)}
                >
                    <div className="logo">
                        <img src={window.location.origin + manifest.icons[2].src} alt="logo" />
                    </div>
                    <div className="title">
                        {login.title[lang]}
                    </div>
                    <div className="inputs">
                        <div className="input"
                            dir={lang ? "rtl" : "ltr"}
                        >
                            <img alt=""
                                src={window.location.origin + '/assets/login/user-solid.svg'}
                            />
                            <input type="text" name="username"
                                value={username}
                                placeholder={login.username[lang]}
                                onSelect={e => this.handleSelect(e)}
                                onBlur={e => this.handleBlur(e)}
                                onChange={e => this.handleChange(e)}
                            ></input>
                        </div>
                        {
                            isInvalid.username ?
                                <span className="error">
                                    {this.state.isInvalid.username}
                                </span> : null
                        }
                        <div className="input"
                            dir={lang ? "rtl" : "ltr"}
                        >
                            <img alt=""
                                src={window.location.origin + '/assets/login/lock-solid.svg'}
                            />
                            <input type="password" name="password"
                                value={password}
                                placeholder={login.password[lang]}
                                onSelect={e => this.handleSelect(e)}
                                onBlur={e => this.handleBlur(e)}
                                onChange={e => this.handleChange(e)}
                            ></input>
                        </div>
                        {
                            isInvalid.password ?
                                <span className="error">
                                    {this.state.isInvalid.password}
                                </span> : null
                        }
                    </div>
                    <Ripple>
                        <button type="submit"
                            className="k-button k-primary mt-1 mb-1 button"
                        >
                            {login.login[lang]}
                        </button>
                    </Ripple>
                </form>

                <div className="footer">
                    <span onClick={(e) => this.toggleLang(e, 0)}>En</span>
                    &nbsp;|&nbsp;
                    <span onClick={(e) => this.toggleLang(e, 1)}>فا</span>
                </div>
            </div>
        );
    }
}

export default withRouter(Login);