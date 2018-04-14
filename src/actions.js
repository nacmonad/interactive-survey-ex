export const RESPONSES_INITIALIZED = 'RESPONSES_INITIALIZED';
export const RESPONSE_CREATED = 'RESPONSE_CREATED';
export const RESPONSE_UPDATED = 'RESPONSE_UPDATED';
export const RESPONSE_DELETED = 'RESPONSE_DELETED';

export const POST_RESPONSE = 'POST_RESPONSE';
export const POST_RESPONSE_SUCCEEDED = 'POST_RESPONSE_SUCCEEDED';
export const POST_RESPONSE_FAILED = 'POST_RESPONSE_FAILED';

export const GET_QUESTION_SET_REQUESTED = 'GET_QUESTION_SET_REQUESTED';
export const GET_QUESTION_SET_SUCCEEDED = 'GET_QUESTION_SET_SUCCEEDED';
export const GET_QUESTION_SET_FAILED = 'GET_QUESTION_SET_FAILED'

export const ZOOMED = 'ZOOMED'

export const FORM_STEP_UP = 'FORM_STEP_UP';
export const FORM_STEP_DOWN = 'FORM_STEP_DOWN';

export function responsesInitialized(res) {
  return {type:RESPONSES_INITIALIZED, payload:res}
}

export function responseCreated(res) {
  return {type:RESPONSE_CREATED, payload:res}
}

export function responseUpdated(res) {
  return {type:RESPONSE_UPDATED, payload:res}
}

export function responseDeleted(res) {
  return {type:RESPONSE_UPDATED, payload:res}
}

export function postResponse(res) {
  return {type:POST_RESPONSE, payload:res}
}

export function postResponseSucceeded(res) {
  return {type:POST_RESPONSE_SUCCEEDED, payload:res}
}

export function postResponseFailed(res) {
  return {type:POST_RESPONSE_FAILED, payload:res}
}

export function getQuestionSet() {
  return { type:GET_QUESTION_SET_REQUESTED }
}

export function getQuestionSetSucceeded(res) {
  return {type:GET_QUESTION_SET_SUCCEEDED, payload:res}
}

export function getQuestionSetFailed(res) {
  return {type:GET_QUESTION_SET_FAILED, payload:res}
}

export function formStepUp() {
  return {type:FORM_STEP_UP}
}

export function formStepDown() {
  return {type:FORM_STEP_DOWN}
}
