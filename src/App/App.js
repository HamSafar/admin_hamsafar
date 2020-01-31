import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'

import Cookies from 'universal-cookie';

import strings from '../static/strings.json'

import './styles.scss' 

import Routes from './Routes/Routes'
import Axios from 'axios';

const cookies = new Cookies();

class App extends Component {

	state = {
		prefs: {
			lang: 0,
			theme: 0
		},
		user: {
			username: '',
			password: '',
			token: '',
			time: '',
			isAuth: false
		}
	}

	changePrefs = (prefs) => this.setState({ prefs })
	changeUser = (user) => this.setState({ user })

	checkAuth = (newState) => {

		//check token by post req to server
		Axios.get('profile',{
			headers: {
				'Authorization': "Bearer " + newState.user.token
			}
		}).then(res => {
			if(res.status === 200)
				return null
			if(this.state.isAuth)
				this.changeUser({ isAuth: false })
		}).catch(e => {
			console.log(e)
			if(this.state.isAuth)
				this.changeUser({ isAuth: false })
		})
	}

  	UNSAFE_componentWillMount() {

		//start a function calls checkAuth() in intervals
		//setInterval(this.checkAuth,5000)

		// restore saved settings from cookies
		var prefsCookie = cookies.get('prefs')
		var userCookie = cookies.get('user')

		if(prefsCookie || userCookie)
			return this.setState({
				prefs: prefsCookie,
				user: userCookie
			})

		console.log('no cookies')
	}

	UNSAFE_componentWillUpdate(newProps, newState) {
		console.log('App updating')

		cookies.set('prefs', newState.prefs, { withCredentials: true , path: '/' });
		cookies.set('user', newState.user, { withCredentials: true , path: '/' });
		
		this.checkAuth(newState)

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
						strings={strings}
						cookies={cookies} />
				</BrowserRouter>
			</div>
		)
	}
}

export default App;
