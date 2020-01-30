import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'

import Cookies from 'universal-cookie';

import strings from '../static/strings.json'

import './styles.scss' 

import Routes from './Routes'

CSS.registerProperty({
  name: '--ang', 
  syntax: '<angle>', 
  initialValue: '0deg', 
  inherits: true
})

const cookies = new Cookies();

class App extends Component {

  state = {
    prefs: {
      lang: ''
    },
    user: ''
  }

  changePrefs = (prefs) => {
    this.setState({
      prefs
    })
  }

  changeUser = (user) => {
    this.setState({
      user
    })
  }

  UNSAFE_componentWillMount() {
    var prefsCookie = cookies.get('prefs')
    if(prefsCookie)
      return this.setState({
        prefs: {
          lang: prefsCookie.lang
        }
      })
    this.setState({
      prefs: {
        lang: 1
      }
    })
  }

  UNSAFE_componentWillUpdate(props, state) {
    cookies.set('prefs', state.prefs, { withCredentials: true , path: '/' });
    return null;
  }

  render() {
    var prefsCookie = cookies.get('prefs')
    console.log(prefsCookie.lang)

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
