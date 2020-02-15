import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import promiseMiddleware from 'redux-promise'
import { ApolloProvider } from 'react-apollo'
import client from './gqlCli'

import * as serviceWorker from './serviceWorker';
import reducers from './redux/root-reducer'
import App from './App/App.dev' //dev

import './index.scss'

const createStoreWithMiddleware = 
     applyMiddleware(promiseMiddleware)(createStore)

ReactDOM.render(
    <ApolloProvider client={client} >
        <Provider store={createStoreWithMiddleware(reducers)} >
            <App />
        </Provider>
    </ApolloProvider>
, document.getElementById('root'))

serviceWorker.register();