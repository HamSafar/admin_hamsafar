import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import promiseMiddleware from 'redux-promise'

import reducers from './reducers'
import App from './App/App'

import './index.scss'

import Axios from 'axios'
const defaultURL = "http://2.184.239.248:9090/"
Axios.defaults.baseURL = defaultURL

const createStoreWithMiddleware = 
     applyMiddleware(promiseMiddleware)(createStore)

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)} >
        <App />
    </Provider>
, document.getElementById('root'))