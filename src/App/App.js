import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Cookies from 'universal-cookie';
import { gql } from 'apollo-boost'
import { setContext } from 'apollo-link-context';

import strings from '../static/strings.json'

import './app.scss' 

import Routes from './Routes/Routes'
//import Axios from 'axios';
import client, { httpLink } from '../gqlCli'


const cookies = new Cookies();
//var storage = window.localStorage; //migrate to localhost

class App extends Component {

	state = {
		prefs: {
			lang: 1,
			theme: 1,
			autoLogin: true
		},
		user: {
			id: '',
			username: '',
			password: '',
			isAuth: false,
			token: '',
			cities: []
		},
		profile: {
			cities: {
				id: '',
				names: []
			},
			credit: '',
			companyName: ''
		},
		city: {
			index: 0,
			id: '',
			names: [],
			data: '',
		}
	}

	changePrefs = (prefs) => this.setState({ prefs })
	changeUser = (user) => this.setState({ user })
	changeProfile = (profile) => {
		// post profile to server
		// then on status 200 return setState new profile
		// checkAuth on any other status 
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

	commitLogin = (username, password) => {

		console.log('commit login')
		
		client.mutate({
			variables: { username, password },
			mutation: gql`
				mutation Login($username: String!, $password: String!) {
					login: loginAdmin(username: $username, password: $password) {
						id
						username
						token
					}
				}
			`
		}).then(res => {
			console.log('logged in')
			this.setState({
				user: {
					...this.state.user,
					username: username,
					password: password,
					isAuth: true,
					token: res.data.login.token,
					id: res.data.login.id,
				}
			})
		}).catch(e => {
			console.log('cant login', e)
			this.logout()
		})
	}

	checkAuth = (newState) => {

		console.log('check auth')

		//Add Token to Request
		const token = newState.user.token
		const authLink = setContext((_, { headers }) => {
			// get the authentication token from local storage if it exists
			//const token = localStorage.getItem('token');
			// return the headers to the context so httpLink can read them
			return {
				headers: {
					...headers,
					authorization: token ? `Bearer ${token}` : "",
				}
			}
		});
		client.link = authLink.concat(httpLink);

		const cityIndex = newState.city.index
		console.log(newState)
		const adminId = newState.user.id
		// Check Token and any Change in Profile //add adminId to allcitiesbysizeandoffset
		client.query({
			variables: { adminId, cityIndex },
			query: gql`
				query Profile($adminId: String!, $cityIndex: Int!) {
					profile: adminProfileByAdminId(adminId: $adminId) {
						cities {
							id
							names
						}
						credit
						companyName
					}
					citiesData: allCitiesBySizeAndOffset(size: 1, offset: $cityIndex) {
						id
						names
						data
						updated
					}
				}
			`
		}).then(res => {
			//console.log(res)
			if( 
				JSON.stringify(res.data.profile) 
				!== JSON.stringify(newState.profile)
				|| JSON.stringify(res.data.citiesData[0].updated)
				!== JSON.stringify(newState.city.updated)
			) {
				console.log('updating state')
				return this.setState({
					profile: res.data.profile,
					city: { 
						...newState.city,
						...res.data.citiesData[0] //data, names, id
					},
					user: {
						...newState.user,
						isAuth: true
					}
				})
			} else { console.log("you are updated") }
		}).catch(e => {
			console.log(e)
			if(!newState.prefs.autoLogin && newState.user.isAuth) {
				console.log("token is false -> auth=false")
				this.setState({ 
					user: {
						...newState.user, 
						isAuth: false, 
						token: '' 
					}
				})
			} else if(newState.prefs.autoLogin) {
				console.log('try loggin')
				this.commitLogin(newState.user.username, newState.user.password)
			} else { 
				console.log('try logout')
				this.logout() 
			}
		})
	}

	componentDidUpdate() {
		console.log('updated', this.state)
	}

	UNSAFE_componentWillUpdate(newProps, newState) {

		console.log('updating')
		
		// check if user is still authed
		if(newState.user.isAuth) {
			console.log('validating auth user')
			this.checkAuth(newState) // if was ok continue?
		}
		// else

		console.log('setting cookies')
		// update cookies either
		cookies.set('prefs', newState.prefs, { withCredentials: true , path: '/' })
		cookies.set('user', newState.user, { withCredentials: true , path: '/' })
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

		if(nextState.prefs && nextState.prefs.autoLogin) {
			if (userCookie) this.commitLogin(userCookie.username, userCookie.password) 
		}
	}

	render() {
		const { prefs: { theme } } = this.state

		return (
			<div className={"App " + (theme? "lightTheme":"darkTheme")}>
				<BrowserRouter>
					<Routes appState={{...this.state}}
						changeUser={this.changeUser}
						changePrefs={this.changePrefs}
						changeProfile={this.changeProfile} 
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
