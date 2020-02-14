import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Cookies from 'universal-cookie';

import strings from '../static/strings.json'

import './app.scss' 

import Routes from './Routes/Routes'

const cookies = new Cookies();

// onAuth rejected -> logout + autoLogin off 
// onComponentDidMount LoginPage -> get username/password from cookies

class App extends Component {

	state = {
		prefs: {
			lang: 1,
			theme: 1,
			autoLogin: true
		},
		user: {
			id: '',
			username: 'hayyaun',
			password: 'hayyaun',
			isAuth: true,
            token: '',
            name: 'hayyan',
			places: []
		},
		profile: {
			places: [
                {
                    id: 'dfsdff',
                    title: 'kish',
				},
				{
                    id: 'sdsdwe',
                    title: 'gheshm',
                }
            ],
			credit: '',
			name: 'hayyaun'
		},
		place: {
			index: 0,
			id: '',
            title: 'kish',
            header: 'Kish Island',
            detail: '',
            pictures: [
                {
                    path: 'https://images.unsplash.com/photo-1581357825340-32259110788a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=751&q=80'
                }
            ],
            tag: { title: 'Ent' },
			updated: null
		},
		appMounted: true
	}

	changePrefs = (prefs) => this.setState({ prefs: { ...this.state.prefs, ...prefs } })
	changeUser = (user) => this.setState({ user: {...this.state.prefs, ...user } })
	changePlace = (place) => this.setState({ place: {...this.state.place, ...place } })
	changeProfile = (profile) => {
		// post profile to server
		// then on status 200 return setState new profile
		// checkAuth on any other status ... 
	}

	logout = () => {
		console.log('logged out')
		this.setState({
			user: {
				...this.state.user,
				isAuth: false
			},
			prefs: {
				...this.state.prefs,
				autoLogin: false
			}
		})
	}

	commitLogin = (username, password, isFirst) => {

		console.log('commit login, isFirst: ', isFirst)
		
        console.log('logged in')
        this.setState({
            user: {
                ...this.state.user,
                username: username,
                password: password,
                isAuth: true,
                token: 'some token',
                id: '12345',
            }
        })
	}

	checkAuth = (newState) => {

		console.log('check auth')

		console.log("you are updated")
	}

	componentDidUpdate() {
		//console.log('updated', this.state)
	}

	UNSAFE_componentWillUpdate(newProps, newState) {

		console.log('updating', newState)

		if(this.state.prefs !== newState.prefs) {
			console.log('setting cookies')

			cookies.set('prefs', newState.prefs, { withCredentials: true , path: '/' })
			cookies.set('user', newState.user, { withCredentials: true , path: '/' })
		}
		
		// check if user is still authed
		if(newState.user.isAuth) {
			this.checkAuth(newState) // if was ok continue?
		}
	}

  	componentDidMount() {

		console.log('mounted')

		// restore saved settings from cookies
		var prefsCookie = cookies.get('prefs')
		var userCookie = cookies.get('user')

		const nextState = {}
		if(prefsCookie) nextState.prefs = prefsCookie
		if(userCookie) nextState.user = userCookie
		console.log('got cookies', nextState)
		
		if(!this.state.appMounted) {
			return this.setState({
				appMounted: true,
				prefs: {
					...this.state.prefs,
					...prefsCookie
				},
				user: {
					...this.state.user,
                    ...userCookie,
                    
				}
			})
		}

		if(nextState.prefs && nextState.prefs.autoLogin) {
			if (userCookie) 
				this.commitLogin(
					userCookie.username, 
					userCookie.password, 
					true
				) 
		}
	}

	userConfirmation = (message, callback) => {
		// this is the default behavior
		console.log(message)
		const allowTransition = window.confirm(message);
		callback(allowTransition);
	}

	render() {
		const { prefs: { theme } } = this.state

		return (
			<div className={"App " + (theme? "lightTheme":"darkTheme")}>
				<BrowserRouter getUserConfirmation={this.userConfirmation}>
					<Routes appState={this.state} //
						changeUser={this.changeUser}
						changePrefs={this.changePrefs}
						changeProfile={this.changeProfile} 
						changePlace={this.changePlace}
						logout={this.logout}
						strings={strings}
						cookies={cookies}
					/>
				</BrowserRouter>
			</div>
		)
	}
}

export default App;
