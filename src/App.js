import React, { Component } from 'react';

import io from 'socket.io-client';
import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';

/* State */
import { compose, createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'

import { RESPONSES_INITIALIZED, RESPONSE_CREATED, RESPONSE_UPDATED, RESPONSE_DELETED } from './actions'
import reducers from './reducers';
import postSaga from './sagas'

import { MuiThemeProvider as NewMuiThemeProvider } from 'material-ui/styles';
import theme from './theme'

import MainCard from './components/MainCard';

import './App.css';

const sagaMiddleware = createSagaMiddleware()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  combineReducers({
    main: reducers
  }),
  composeEnhancers(applyMiddleware(sagaMiddleware))
)

sagaMiddleware.run(postSaga)

export default class App extends Component {
  constructor(){
    super();
    try {
      this.socket = io('http://localhost:3030');
      this.client = feathers().configure(socketio(this.socket));

    } catch (e) {
      console.log("error connecting")
      throw e
    }
    this.responseList = []
  }
  componentWillMount() {
    console.log("setting up app event listeners")
    //let responseList = this.responseList

    this._getInitialResponses(this.client,this.responseList);
    //connects socket subcscription events to redux
    this.client.service('responses').on('created', response => {
        store.dispatch({type:RESPONSE_CREATED, payload:response})
      });
    this.client.service('responses').on('updated', response => {
        store.dispatch({type:RESPONSE_UPDATED, payload:response})
      });
    this.client.service('responses').on('removed', response => {
        store.dispatch({type:RESPONSE_DELETED, payload:response})
      });

  }

  async _getInitialResponses(client, responseList) {
    responseList = await client.service('responses').find();
    store.dispatch({type:RESPONSES_INITIALIZED, payload:responseList})
  }

  render() {
    return (
      <div className="App">
          <NewMuiThemeProvider theme={theme}>
            <Provider store={store}>
              <MainCard/>
            </Provider>
          </NewMuiThemeProvider>
      </div>
    );
  }

}

export const feathersClient = App.client;
