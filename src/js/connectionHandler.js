import { RESPONSES_INITIALIZED, RESPONSE_CREATED, RESPONSE_UPDATED, RESPONSE_DELETED } from '../actions'

import {store} from '../App'
import {client} from '../client';

export function _connectionHandler() {
  console.log("adding listeners")
  //connects socket subcscription events to redux
  client.service('responses').on('created', response => {
      store.dispatch({type:RESPONSE_CREATED, payload:response})
    });
  client.service('responses').on('updated', response => {
      console.log("updated")
      console.log(response)
      store.dispatch({type:RESPONSE_UPDATED, payload:response})
    });
  client.service('responses').on('removed', response => {
      store.dispatch({type:RESPONSE_DELETED, payload:response})
    });
}

export async function _getInitialResponses() {
  let responseList = await client.service('responses').find();
  store.dispatch({type:RESPONSES_INITIALIZED, payload:responseList})
}
