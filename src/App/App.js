import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'

import './styles.scss' 

import Routes from './Routes'

class App extends Component {

  state = {
    prefs: {
      lang: 1
    }
  }

  changePrefs = (prefs) => {
    this.setState({
      prefs
    })
  }

  render() {
    return (
      
        <div className="App">
          <BrowserRouter>
              <Routes user={this.props.user} {...this.state} changePrefs={this.changePrefs} />
          </BrowserRouter>
        </div>

    )
  }
}

export default App;
