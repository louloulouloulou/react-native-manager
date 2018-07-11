import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import firebase from 'firebase'
import ReduxThunk from 'redux-thunk' // middleware for async action creators.
import reducers from './reducers'
import LoginForm from './components/LoginForm'
import Router from './Router'

export default class App extends Component {

	componentDidMount() {
		// Initialize Firebase and Amplitude
		var config = require('./config.json')
    firebase.initializeApp(config.firebase)

	}

	render(){
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk))

		return(
			<Provider store={store}>
				<Router />
			</Provider>
		)
	}
}