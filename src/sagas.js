import { call, put, takeLatest } from 'redux-saga/effects'
import {client} from './client';

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
    //gets a set of two text questions, and one scale question
     const textQuestions = yield call(()=>client.service('questions').find({query:{type:"text", $limit:2}}));
     const scaleQuestions = yield call(()=>client.service('questions').find({query:{type:"scale", $limit:1}}));
     const questionSet = {
       text:textQuestions,
       scale:scaleQuestions
     }

     yield put({ type: "GET_QUESTION_SET_SUCCEEDED", payload: questionSet });
  } catch (e) {
     yield put({type: "GET_QUESTION_SET_FAILED", message: e.message});
  }
}

//listner
export function* getQuestionSetSaga() {
  yield takeLatest("GET_QUESTION_SET_REQUESTED", getQuestionSet)
}
