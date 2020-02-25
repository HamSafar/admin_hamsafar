import React, { PureComponent } from 'react'
import { BrowserRouter } from 'react-router-dom'

import strings from '../static/strings.json'

import './app.scss'

import Routes from './Routes/Routes'

// onAuth rejected -> logout + autoLogin off 
// onComponentDidMount LoginPage -> get username/password from cookies

class App extends PureComponent {

	componentDidUpdate() {

	}

	componentDidMount() {
		const {
			updateUser,
			commitLogin,
			user: { username, password },
			prefs: { autoLogin }
		} = this.props

		if (autoLogin && !user.isAuth)
			commitLogin({ username, password })
		
	}

	render() {
		const { prefs: { theme }, getProfile } = this.props
		console.log('app rendered')
		return (
			<div className={`App ${ theme ? 'lightTheme' : 'darkTheme' }`}>
				<span>Development mode</span>
				<BrowserRouter>
					<Routes
						strings={strings}
						{...this.props}
					/>
				</BrowserRouter>
			</div>
		)
	}
}

export default App;
