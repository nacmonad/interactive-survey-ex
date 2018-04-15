import { ZOOMED,
  RESPONSES_INITIALIZED,
  RESPONSE_CREATED,
  RESPONSE_UPDATED,
  RESPONSE_DELETED,
  GET_QUESTION_SET_SUCCEEDED,
  FORM_STEP_UP,
  FORM_STEP_DOWN,
  FORM_SET_GROUP,
  UPDATE_RESPONSE_SET} from './actions';

const initialState = {
  responseSet: {
    total:0,
    data:[]
  },
  questionSet: {
    text:{
      data:[{},{}]
    },
    scale:{
      data:[{}]
    }
  },
  form: {
    group:-1,
    step:0,
    questionOne:{
      text:""
    },
    questionTwo:{
      text:""
    },
    questionThree:{
      text:"",
      scaleA: 0.5,
      scaleB: 0.5,
      scaleC: 0.5,
      scaleD: 0.5
    }

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
    case UPDATE_RESPONSE_SET:
      console.log(action.payload)
      switch(action.payload.question) {
        case 1:
          return {
            ...state,
            form:{
              ...state.form,
              questionOne:{
                text:action.payload.text
              }
            }
          }
        case 2:
        return {
          ...state,
          form:{
            ...state.form,
            questionTwo:{
              text:action.payload.text
            }
          }
        }
        case 3:
          return {
            ...state,
            form:{
              ...state.form,

            }
          }

        default:
          return {
            ...state,

          }
      }

    case FORM_SET_GROUP:
      console.log(action.payload)
      return {
        ...state,
        form: {
          ...state.form,
          group:action.payload
        }
      }
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
