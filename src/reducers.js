import { RESPONSES_INITIALIZED, RESPONSE_CREATED, RESPONSE_UPDATED, RESPONSE_DELETED, GET_QUESTION_SET_SUCCEEDED } from './actions';

const initialState = {
  responseSet: {
    total:0,
    data:[]
  },
  questionSet: {
    text:[],
    scale:[]
  }
};

export default function main(state, action) {
  if (typeof state === 'undefined') {
    return initialState
  }

  switch(action.type) {
    case GET_QUESTION_SET_SUCCEEDED:
      return {
        ...state,
        questionSet:action.payload
      }
    case RESPONSES_INITIALIZED:
      return {
        ...state,
        responseSet: {...action.payload}
      }
    case RESPONSE_CREATED:
      console.log(action)
      return {
        ...state,
        responseSet:{
          total:state.responseSet.total +1,
          data: [...state.responseSet.data, action.payload]
        }
      }
    case RESPONSE_UPDATED:
        console.log(action)
      return {
      ...state,
      responseSet:{
          ...state.responseSet,
          data: state.responseSet.data.map(e=>{
              if(action.payload._id===e._id) return action.payload
              return e
            })
        }
    }
    case RESPONSE_DELETED:
      const index = state.responseSet.data.findIndex(e=>e._id===action.payload._id)

      return {
        ...state,
        responseSet:{
          total: state.responseSet.total - 1,
          data: [].concat(state.responseSet.data.slice(0, index), state.responseSet.data.slice(index+1, state.responseSet.data.length))
        }
      }
    default:
      return state;
  }
}
