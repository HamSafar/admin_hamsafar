import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import './styles.scss' 

import Routes from './Routes'

function App(props) {
  return (
    
      <div className="App">
        <BrowserRouter>
            <Routes user={props.user} />
        </BrowserRouter>
      </div>

  )
}

export default App;
