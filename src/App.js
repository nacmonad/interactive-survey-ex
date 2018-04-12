import React, { Component } from 'react';

import io from 'socket.io-client';
import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';

/* State & Sagas */
import { compose, createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import reducers from './reducers';
import {getQuestionSetSaga, getResponsesSaga, postSaga} from './sagas'

/* Actions */
import {_getInitialResponses, _connectionHandler} from './js/connectionHandler';

/* Material UI */
import { MuiThemeProvider } from 'material-ui/styles';
import theme from './theme'


/* Main View & Extra Styles*/
import MainCard from './components/MainCard';
import './App.css';

/* Store Creation */
const sagaMiddleware = createSagaMiddleware()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  combineReducers({
    main: reducers
  }),
  composeEnhancers(applyMiddleware(sagaMiddleware))
)

sagaMiddleware.run(getQuestionSetSaga)
//sagaMiddleware.run(postSaga)
export default class App extends Component {
  constructor(){
    super();
    try {
      this.socket = io('http://localhost:3030');
      this.client = feathers().configure(socketio(this.socket));
      _connectionHandler.bind(this);
      _getInitialResponses.bind(this);

    } catch (e) {
      console.log("error connecting")
      throw e
    }
  }
  componentWillMount() {
    console.log("setting up app event listeners")
    _connectionHandler(this.client);
    _getInitialResponses(this.client);
    store.dispatch({type:"GET_QUESTION_SET_REQUESTED"})

  }

  render() {
    return (
      <div className="App">
          <MuiThemeProvider theme={theme}>
            <Provider store={store}>
              <MainCard/>
            </Provider>
          </MuiThemeProvider>
      </div>
    );
  }
}

export const socket = App.socket;
export const client = App.client;
