import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import promiseMiddleware from 'redux-promise'

import reducers from './reducers'
import App from './App/App'

import './index.scss'

import axios from 'axios'
const defaultURL = "http://localhost:9090/" //change to 2.184.239.248
axios.defaults.baseURL = defaultURL
axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

const createStoreWithMiddleware = 
     applyMiddleware(promiseMiddleware)(createStore)

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)} >
        <App />
    </Provider>
, document.getElementById('root'))