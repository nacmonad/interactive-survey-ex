import { ZOOMED, RESPONSES_INITIALIZED, RESPONSE_CREATED, RESPONSE_UPDATED, RESPONSE_DELETED, GET_QUESTION_SET_SUCCEEDED, FORM_STEP_UP, FORM_STEP_DOWN } from './actions';

const initialState = {
  responseSet: {
    total:0,
    data:[]
  },
  questionSet: {
    text:[],
    scale:[]
  },
  form: {
    step:0,
  },
  viz:{
    active:-1,
    zoomed:false
  }
};

export default function main(state, action) {
  if (typeof state === 'undefined') {
    return initialState
  }

  switch(action.type) {
    case FORM_STEP_UP:
      console.log(action)
      console.log(state)
      return {
        ...state,
        form: {
          ...state.form,
          step:state.form.step+1
        }
      }
    case FORM_STEP_DOWN:
      return {
        ...state,
        form: {
          ...state.form,
          step:state.form.step-1
        }
      }
    case ZOOMED:
      return {
        ...state,
        viz:action.payload
      }
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
      action.payload.x = 800*Math.random()
      action.payload.y = 600*Math.random()
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
