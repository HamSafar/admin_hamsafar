import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

import manifset from '../../../static/manifset.json'

import { Ripple } from '@progress/kendo-react-ripple';

import './styles.scss'

class Login extends Component {

    state = {
        lang: this.props.prefs.lang,
        username: '',
        password: '',
        isInvalid: {
            username: true,
            password: true
        }
    }

    toggleLang = (e,lang) => this.props.changePrefs({ lang })

    handleSelect = (e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.75)'
    handleBlur = (e) => {if(!e.target.value)  e.target.style.backgroundColor = 'transparent'}

    handleChange = (e) => {
        if(e.target.name === 'username')
            return this.setState({ username: e.target.value })
        
        if(e.target.name === 'password')
            return this.setState({ password: e.target.value })
    }

    validate = (e,s) => {
        if(s === 'username') {
            if(e.length < 4)
                return 'Username must be more than 6 characters'
            return undefined
        }
        if(s === 'password') {
            if(e.length < 6)
                return 'Password must be more than 6 characters'
            return undefined
        }
    } 

    handleSubmit = (e) => {
        e.preventDefault()

        var { username, password } = this.state
        const valid = {
            username: this.validate(username,'username'),
            password: this.validate(password,'password')
        }

        this.setState({
            isInvalid: {
                username: valid.username,
                password: valid.password
            }
        })

        if(!valid.username && !valid.password) {
        
            axios.post('auth/login', {
                username, password
            }, { 
                method: 'POST',
                mode: 'no-cors',
                withCredentials: true,
                useCredentails: true,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                credentials: 'same-origin'
            }).then(res => {
                console.log(res) 
                const user = {
                    username: username,
                    password: password,
                    token: res.data.token,
                    time: res.data.time
                }
                this.props.changeUser(user)
            }).catch(e => {
                console.log(e)
                this.setState({
                    isInvalid: {
                        password: e.toString()
                    }
                })
            })
        }
    }

    UNSAFE_componentWillMount() {
        if(this.props.user.isAuth)
            this.props.history.push('/dashboard')
    }

    componentDidMount() {
        const { lang } = this.state
        const { strings: { login } } = this.props
        document.title = login.title[lang]
    }

    render() {
        const { lang, username, password, isInvalid } = this.state
        const { strings: { login } } = this.props

        return (
            <div className="Login">
                <form className="form" 
                    onSubmit={e => this.handleSubmit(e)}
                >
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
                            dir={lang? "rtl":"ltr"}
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
                    <span onClick={(e)=>this.toggleLang(e,0)}>En</span>
                    &nbsp;|&nbsp;
                    <span onClick={(e)=>this.toggleLang(e,1)}>فا</span>
                </div>
            </div>
        );
    }
}

export default withRouter(Login);