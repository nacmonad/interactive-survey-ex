import { call, put, takeLatest } from 'redux-saga/effects'
import {client} from './client';
import {store} from './App'

async function ApiPostResponse(action) {
  console.log(action.response)
  return await client.service('responses').create(action.response);
}

// worker Saga: will be fired on POST_RESPONSE_REQUESTED actions
function* postResponse(action) {
  console.log("post response requested!")

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
    console.log("Hnalde the form side effect!")
    console.log(currentForm)
    switch(currentForm.step){
      case 0:
        break;
      case 1:
        console.log("group completed")
        break;
      case 2:
        console.log("post q1")
        yield put({type: "POST_RESPONSE_REQUESTED",
          response:{ questionId:1,
            group:currentForm.group+1,
            questionType:'text',
            ...currentForm.questionOne}});
        break;
      case 3:
        console.log("post q2")
        yield put({type: "POST_RESPONSE_REQUESTED",
          response:{ questionId:2,
            group:currentForm.group+1,
            questionType:'text',
            ...currentForm.questionTwo}});
        break;
      case 4:
        console.log("post q3")
        yield put({type: "POST_RESPONSE_REQUESTED",
          response:{
            questionId:3,
            group:currentForm.group+1,
            questionType:'scale',
            ...currentForm.questionThree}});
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
