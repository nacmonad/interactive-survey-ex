import { RESPONSES_INITIALIZED, RESPONSE_CREATED, RESPONSE_UPDATED, RESPONSE_DELETED } from './actions';

const initialState = {
  data: []
};

export default function main(state, action) {
  if (typeof state === 'undefined') {
    return initialState
  }

  switch(action.type) {
    case RESPONSES_INITIALIZED:
      console.log(action)
      return {
        ...action.payload
      }
    case RESPONSE_CREATED:
      console.log(action)
      return {
        ...state,
        total:state.total +1,
        data: [...state.data, action.payload]
      }
    case RESPONSE_UPDATED:
      console.log(action)
      return {
      ...state,
      data:state.data.map(e=>{
          if(action.payload._id===e._id) return action.payload
          return e
        })
      }
    case RESPONSE_DELETED:
      const index = state.data.findIndex(e=>e._id===action.payload._id)

      return {
        ...state,
        data: [].concat(state.data.slice(0, index), state.data.slice(index+1, state.data.length)),
        total: state.total -1
      }
    default:
      return state;
  }
}
