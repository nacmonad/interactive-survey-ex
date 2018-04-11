import { call, put, takeLatest } from 'redux-saga/effects'
import { feathersClient } from './App.js'

console.log(feathersClient)
// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* postResponse(action) {
   try {
      //const user = yield call(Api.postResponse, action.payload.userId);
      yield put({type: "POST_RESPONSE_SUCCEEDED", user: "herb"});
   } catch (e) {
      yield put({type: "POST_RESPONSE_FAILED", message: e.message});
   }
}

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
function* postSaga() {
  yield takeLatest("POST_RESPONSE_REQUESTED", postResponse);
}

export default postSaga;
