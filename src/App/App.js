import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'

import Cookies from 'universal-cookie';

import strings from '../static/strings.json'

import './styles.scss' 

import Routes from './Routes/Routes'

const cookies = new Cookies();

class App extends Component {

	state = {
		prefs: {
			lang: '',
			theme: ''
		},
		user: {
			username: '',
			password: '',
			token: '',
			time: '',
			isAuth: true //''
		}
	}

	changePrefs = (prefs) => this.setState({ prefs })

	changeUser = (user) => this.setState({ user })

  	UNSAFE_componentWillMount() {

		var prefsCookie = cookies.get('prefs')
		if(prefsCookie)
		return this.setState({
			prefs: {
				lang: 0, //prefsCookie.lang
				theme: 0 //prefsCookie.theme
			}
		})

		var userCookie = cookies.get('user')
		if(userCookie) 
		return this.setState({
			user: {
				isAuth: userCookie.isAuth
			}
		})

		this.setState({
			prefs: {
				lang: 1,
				theme: 1
			},
			user: {
				isAuth: true //false on default
			}
		})
	}

	UNSAFE_componentWillUpdate(props, state) {
		cookies.set('prefs', state.prefs, { withCredentials: true , path: '/' });
		cookies.set('user', state.user, { withCredentials: true , path: '/' });
		return null;
	}

	render() {
		return (
			<div className="App">
				<BrowserRouter>
					<Routes {...this.state}
						changeUser={this.changeUser}
						changePrefs={this.changePrefs}
						strings={strings} />
				</BrowserRouter>
			</div>
		)
	}
}

export default App;
