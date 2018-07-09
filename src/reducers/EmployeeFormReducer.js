import {
  UPDATE_EMPLOYEE,
  EMPLOYEE_FORM_CLEAR
} from '../actions/types'

const INITIAL_STATE = {
  name: '',
  phone: '',
  shift: ''
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type){
    case UPDATE_EMPLOYEE: // action.payload ~ { prop: 'name', value: 'jane' }
      return { ...state, [action.payload.prop]: action.payload.value }
    case EMPLOYEE_FORM_CLEAR:
      return INITIAL_STATE
    default:
      return state
  }
}