export const RESPONSES_INITIALIZED = 'RESPONSES_INITIALIZED';
export const RESPONSE_CREATED = 'RESPONSE_CREATED';
export const RESPONSE_UPDATED = 'RESPONSE_UPDATED';
export const RESPONSE_DELETED = 'RESPONSE_DELETED';

export const POST_RESPONSE = 'POST_RESPONSE';
export const POST_RESPONSE_SUCCEEDED = 'POST_RESPONSE_SUCCEEDED';
export const POST_RESPONSE_FAILED = 'POST_RESPONSE_FAILED';

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
