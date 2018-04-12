import { call, put, takeLatest } from 'redux-saga/effects'

// worker Saga: will be fired on POST_RESPONSE_REQUESTED actions
function* postResponse(action) {
   try {
      //const user = yield call(Api.postResponse, action.payload.userId);
      yield put({type: "POST_RESPONSE_SUCCEEDED", user: "herb"});
   } catch (e) {
      yield put({type: "POST_RESPONSE_FAILED", message: e.message});
   }
}
// listener Saga
export function* postSaga() {
  yield takeLatest("POST_RESPONSE_REQUESTED", postResponse);
}

//worker
function* getResponseList(action) {
  try {
     //const user = yield call(Api.postResponse, action.payload.userId);
     yield put({type: "GET_RESPONSES_SUCCEEDED", user: "herb"});
  } catch (e) {
     yield put({type: "GET_RESPONSES_FAILED", message: e.message});
  }
}

//listner
export function* getResponsesSaga() {
  yield takeLatest("GET_RESPONSES", getResponseList)
}

//worker
function* getQuestionSet(action) {
  try {
    console.log("get some dang question sets yo");
     //const textQuestions = yield call(Api.postResponse, action.payload.userId);
     //get two questions by text

     //one queston by scale

     yield put({type: "GET_QUESTION_SET_SUCCEEDED", user: "herb"});
  } catch (e) {
     yield put({type: "GET_QUESTION_SET_FAILED", message: e.message});
  }
}

//listner
export function* getQuestionSetSaga() {
  yield takeLatest("GET_QUESTION_SET_REQUESTED", getQuestionSet)
}
