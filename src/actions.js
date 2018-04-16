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
export const FORM_SET_GROUP = 'FORM_SET_GROUP';

export const UPDATE_RESPONSE_SET = 'UPDATE_RESPONSE_SET';
export const TOGGLE_DISABLE_SLIDER = 'TOGGLE_DISABLE_SLIDER';
export const HIDE_FORM = 'HIDE_FORM'

export function hideForm() {
  return {type: HIDE_FORM};
}
export function toggleDisableSlider() {
  return { type:TOGGLE_DISABLE_SLIDER }
}
export function updateResponseSet(responseSet) {
  return {type:UPDATE_RESPONSE_SET, payload:responseSet}
}
export function formSetGroup(group) {
  return {type:FORM_SET_GROUP, payload:group}
}

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
