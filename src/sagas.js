import { delay } from 'redux-saga'
import { call, put, takeLatest } from 'redux-saga/effects'
import {client} from './client';
import {store} from './App'

async function ApiPostResponse(action) {
  return await client.service('responses').create(action.response);
}

// worker Saga: will be fired on POST_RESPONSE_REQUESTED actions
function* postResponse(action) {
   try {
      const response = yield call(ApiPostResponse, action);
      yield put({type: "POST_RESPONSE_SUCCEEDED", response});
   } catch (e) {
      yield put({type: "POST_RESPONSE_FAILED", message: e.message});
   }
}
// listener Saga
export function* postSaga() {
  yield takeLatest("POST_RESPONSE_REQUESTED", postResponse);
}

//form step saga to make POST_RESPONSE_REQUESTED
function* handleFormStep(action) {
  let currentForm = store.getState().main.form;
  try {
    switch(currentForm.step){
      case 0:
        break;
      case 1:
        break;
      case 2:
        yield put({ type: 'SET_ACTIVE_TAB', payload:0 })
        break;
      case 3:
        yield put({type: "POST_RESPONSE_REQUESTED",
          response:{ questionId:1,
            group:currentForm.group+1,
            location:currentForm.location,
            questionType:'text',
            ...currentForm.questionOne}});
        yield delay(1500)
        yield put({ type: 'SET_ACTIVE_TAB', payload:1 })
        break;
      case 4:
        yield put({type: "POST_RESPONSE_REQUESTED",
          response:{ questionId:2,
            group:currentForm.group+1,
            location:currentForm.location,
            questionType:'text',
            ...currentForm.questionTwo}});
        yield delay(1500)
        yield put({ type: 'SET_ACTIVE_TAB', payload:2 })
        break;
      case 5:
        yield put({type: "POST_RESPONSE_REQUESTED",
          response:{
            questionId:3,
            group:currentForm.group+1,
            location:currentForm.location,
            questionType:'scale',
            ...currentForm.questionThree}});
        yield delay(1500)
        yield put({ type: 'SET_ACTIVE_TAB', payload:0 })
        break;
      default:
        console.log("unhandled case " + currentForm.step)
        break;
    }
  } catch (e) {

  }
}
export function* formStepSaga() {
  yield takeLatest("FORM_STEP_UP", handleFormStep)
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
