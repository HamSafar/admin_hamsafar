import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import promiseMiddleware from 'redux-promise'

import reducers from './reducers'
import App from './App/App'

import './styles/index.scss'

const createStoreWithMiddleware = 
     applyMiddleware(promiseMiddleware)(createStore)

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)} >
        <App />
    </Provider>
, document.getElementById('root'))