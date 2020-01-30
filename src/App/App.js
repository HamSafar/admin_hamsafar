import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'

import strings from '../static/strings.json'

import './styles.scss' 

import Routes from './Routes'

CSS.registerProperty({
  name: '--ang', 
  syntax: '<angle>', 
  initialValue: '0deg', 
  inherits: true
})

class App extends Component {

  state = {
    prefs: {
      lang: 1
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
