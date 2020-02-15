import React from 'react'
import ReactDOM from 'react-dom'

import * as serviceWorker from './serviceWorker';
import AppProvider from './App/App.provider' //dev

import './index.scss'

ReactDOM.render(
    <AppProvider />
, document.getElementById('root'))

serviceWorker.register();