import { RESPONSES_INITIALIZED, RESPONSE_CREATED, RESPONSE_UPDATED, RESPONSE_DELETED } from '../actions'

import {store} from '../App'

console.log(this)

export function _connectionHandler(client) {
  console.log("adding listeners")
  //connects socket subcscription events to redux
  client.service('responses').on('created', response => {
      store.dispatch({type:RESPONSE_CREATED, payload:response})
    });
  client.service('responses').on('updated', response => {
      store.dispatch({type:RESPONSE_UPDATED, payload:response})
    });
  client.service('responses').on('removed', response => {
      store.dispatch({type:RESPONSE_DELETED, payload:response})
    });
}

export async function _getInitialResponses(client, responseList) {
  try {
    let _responseList = await client.service('responses').find();
    store.dispatch({type:RESPONSES_INITIALIZED, payload:responseList})
  } catch (e) {
    console.log(e)
    store.dispatch({type:RESPONSES_INITIALIZED, payload:[]})

  }

}
