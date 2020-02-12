import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Cookies from 'universal-cookie';
import { gql } from 'apollo-boost'
import { setContext } from 'apollo-link-context';

import strings from '../static/strings.json'

import './app.scss' 

import Routes from './Routes/Routes'
import client, { httpLink } from '../gqlCli'


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
			username: '',
			password: '',
			isAuth: false,
			token: '',
			places: []
		},
		profile: {
			places: [
				{
					id: '',
					title: '',
				}
			],
			credit: '',
			name: ''
		},
		place: {
			index: 0,
			id: '',
			title: '',
            header: '',
            detail: '',
            pictures: [],
            tag: { title: '' },
			updated: null
		},
		appMounted: false
	}

	changePrefs = (prefs) => this.setState({ prefs: { ...this.state.prefs, ...prefs } })
	changeUser = (user) => this.setState({ user: {...this.state.prefs, ...user } })
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

	commitLogin = async (username, password, isFirst) => {

		console.log('commit login, isFirst: ', isFirst)
		
		return await client.mutate({
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

	checkAuth = async (newState) => {

		console.log('check auth')

		//Add Token to Request
		const token = newState.user.token
		const authLink = setContext((_, { headers }) => {
			return {
				headers: {
					...headers,
					authorization: token ? `Bearer ${token}` : "",
				}
			}
		});
		client.link = authLink.concat(httpLink);

		const placeIndex = newState.place.index
		const adminId = newState.user.id
		// Check Token and any Change in Profile //add adminId to allplacesbysizeandoffset
		return client.query({
			variables: { adminId, placeIndex },
			query: gql`
				query Profile($adminId: String!, $placeIndex: Int!) {
					profile: adminById(adminId: $adminId) {
						places {
							id
							title
						}
						credit
						name
					}
					placesData: allAdminsPlacesBySizeAndOffset(adminId: $adminId, size: 1, offset: $placeIndex) {
						id
						title
						updated
					}
				}
			`
		}).then(res => {
			console.log("res", res)
			const resDataProfile = res.data.profile
			const newStateProfile = newState.profile
			const resDataPlaceDataUpdated = (res.data.placesData.length > 0) ? res.data.placesData[0].updated : null
			const newStatePlaceUpdated = newState.place.updated

			if( 
				JSON.stringify(resDataProfile) 
				!== JSON.stringify(newStateProfile)
				|| JSON.stringify(resDataPlaceDataUpdated)
				!== JSON.stringify(newStatePlaceUpdated)
			) {
				console.log('updating profile & place')
				return this.setState({
					profile: res.data.profile,
					place: { 
						...newState.place,
						...res.data.placesData[0] //data, title, id
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
				this.commitLogin(newState.user.username, newState.user.password, false)
			} else { 
				console.log('try logout')
				this.logout() 
			}
		})
	}

	componentDidUpdate() {
		//console.log('updated', this.state)
	}

	async UNSAFE_componentWillUpdate(newProps, newState) {

		console.log('updating', newState)

		if(this.state.prefs !== newState.prefs) {
			console.log('setting cookies')

			cookies.set('prefs', newState.prefs, { withCredentials: true , path: '/' })
			cookies.set('user', newState.user, { withCredentials: true , path: '/' })
		}
		
		// check if user is still authed
		if(newState.user.isAuth) {
			await this.checkAuth(newState) // if was ok continue?
		}
	}

  	async componentDidMount() {

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
					...userCookie
				}
			})
		}

		if(nextState.prefs && nextState.prefs.autoLogin) {
			if (userCookie) 
				await this.commitLogin(
					userCookie.username, 
					userCookie.password, 
					true
				) 
		}
	}

	render() {
		const { prefs: { theme } } = this.state

		return (
			<div className={"App " + (theme? "lightTheme":"darkTheme")}>
				<BrowserRouter>
					<Routes appState={this.state} //
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
