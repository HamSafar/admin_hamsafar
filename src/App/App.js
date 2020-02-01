import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
//import _ from 'lodash'
import Cookies from 'universal-cookie';

import strings from '../static/strings.json'

import './app.scss' 

import Routes from './Routes/Routes'
import Axios from 'axios';

const cookies = new Cookies();

class App extends Component {

	state = {
		strings: strings,
		prefs: {
			lang: 0,
			theme: 1,
			accentColor: 'rgb(51, 42, 124)',
			autoLogin: true
		},
		user: {
			username: '',
			password: '',
			token: '',
			time: '',
			isAuth: false
		},
		profile: ''
	}

	changePrefs = (prefs) => this.setState({ prefs })
	changeUser = (user) => this.setState({ user })
	changeProfile = (profile) => {
		// post profile to server
		// then on status 200 return setState new profile
		// checkAuth on any other status 
	}

	checkAuth = (newState) => {

		Axios.defaults.headers['Authorization'] = "Bearer " + newState.user.token

		//check token by post req to server
		Axios.get('profile').then(res => {
			if(res.status === 200) {
				if(JSON.stringify(res.data) !== JSON.stringify(newState.profile))
					return this.setState({
						profile: res.data
					})
				else return null
			}
			if(this.state.user.isAuth)
				this.changeUser({ ...newState, isAuth: false })
		}).catch(e => {
			console.log(e) //remove this
			if(this.state.user.isAuth)
				this.changeUser({ ...newState, isAuth: false })
		})
	}

	UNSAFE_componentWillMount() {

		// auto-login if in prefsCookie
		// using saved user and pass
		var userCookie = cookies.get('user')
		const { username, password } = userCookie
		if( username && password ) {
            Axios.post('auth/login', {
                username, password
            }).then(res => {
                const user = {
                    username: username,
                    password: password,
                    isAuth: true,
                    token: res.data.access_token,
                    //time: res.data.time
                }
                this.changeUser(user) //updates App
            }).catch(e => {
                console.log(e)
            })
        }
	}

  	componentDidMount() {

		// restore saved settings from cookies
		var prefsCookie = cookies.get('prefs')
		var userCookie = cookies.get('user')
		var profileCookie = cookies.get('profile')

		const nextState = {}
		if(prefsCookie) nextState.prefs = prefsCookie
		if(userCookie) nextState.user = userCookie
		if(profileCookie) nextState.profile = profileCookie

		if(prefsCookie || userCookie || profileCookie)
			return this.setState(nextState) // update (chkAuth)

		console.log('no cookies')
	}

	UNSAFE_componentWillUpdate(newProps, newState) {
		
		// check if user is still authed
		this.checkAuth(newState)

		// update cookies either
		cookies.set('prefs', newState.prefs, { withCredentials: true , path: '/' })
		cookies.set('user', newState.user, { withCredentials: true , path: '/' })
		cookies.set('profile', newState.profile, { withCredentials: true , path: '/' });

		return null;
	}

	render() {
		const { prefs: { theme } } = this.state

		return (
			<div className={"App " + (theme? "lightTheme":"darkTheme")}>
				<BrowserRouter>
					<Routes {...this.state}
						changeUser={this.changeUser}
						changePrefs={this.changePrefs}
						changeProfile={this.changeProfile} 
						//strings={strings}
						cookies={cookies}
					/>
				</BrowserRouter>
			</div>
		)
	}
}

export default App;
