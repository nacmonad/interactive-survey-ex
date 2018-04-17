import { ZOOMED,
  RESPONSES_INITIALIZED,
  RESPONSE_CREATED,
  RESPONSE_UPDATED,
  RESPONSE_DELETED,
  GET_QUESTION_SET_SUCCEEDED,
  FORM_STEP_UP,
  FORM_STEP_DOWN,
  FORM_SET_GROUP,
  UPDATE_RESPONSE_SET,
  TOGGLE_DISABLE_SLIDER,
  HIDE_FORM,
  SET_ACTIVE_TAB,
  CLOSE_DIALOG } from './actions';

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
  activeTab:0,
  showIntroDialog: true,
  showForm:true,
  form: {
    group:-1,
    step:0,
    disableSlider:false,
    questionOne:{
      text:""
    },
    questionTwo:{
      text:""
    },
    questionThree:{
      scaleA: 50,
      scaleB: 50,
      scaleC: 50,
      scaleD: 50
    },
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
    case CLOSE_DIALOG:
      return {
        ...state,
        showIntroDialog:false
      }
    case SET_ACTIVE_TAB:
      return {
        ...state,
        activeTab:action.payload
      }
    case HIDE_FORM:
      return {
        ...state,
        showForm:false
      }
    case TOGGLE_DISABLE_SLIDER:
      return {
        ...state,
        form: {
          ...state.form,
          disableSlider: !state.form.disableSlider
        }
      }
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
          console.log("update scales")
          console.log(action)
          return {
            ...state,
            form:{
              ...state.form,
            questionThree:{
              ...action.payload.scales
              }

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
