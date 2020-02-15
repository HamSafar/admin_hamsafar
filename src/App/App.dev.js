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
	changeUser = (user) => this.setState({ user: { ...this.state.prefs, ...user } })
	changePlace = (place) => this.setState({ place: { ...this.state.place, ...place } })

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
		
	}

	UNSAFE_componentWillUpdate(newProps, newState) {

	}

	componentDidMount() {

	}

	render() {
		const { prefs: { theme } } = this.state

		return (
			<div className={"App " + (theme ? "lightTheme" : "darkTheme")}>
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
