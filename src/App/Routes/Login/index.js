import React, { Component } from 'react'

import './styles.scss'

class Login extends Component {

    handleSelect = (e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.75)'
    handleBlur = (e) => e.target.style.backgroundColor = 'transparent'

    login = () => {
        
    }

    render() {
        return (
            <div className="Login">
                <div className="Login-Form">
                    <div className="logo">
                        <img src={window.location.origin + '/logo192.png'} alt="logo"/>
                    </div>
                    <div className="title">
                        ورود مدیریت همسفر
                    </div>
                    <div className="inputs">
                        <input type="text" name="username" 
                            placeholder="نام کاربری" dir="rtl"
                            onSelect={e => this.handleSelect(e)}
                            onBlur={e => this.handleBlur(e)}
                        ></input>
                        <input type="password" name="password" 
                            placeholder="گذرواژه" dir="rtl"
                            onSelect={e => this.handleSelect(e)}
                            onBlur={e => this.handleBlur(e)}
                        ></input>
                    </div>
                    <button className="button" onClick={e => this.login}>
                        ورود
                    </button>
                </div>
            </div>
        );
    }
}

export default Login;