import {
  EMPLOYEE_FETCH_SUCC
} from '../actions/types'

const INITIAL_STATE = {}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMPLOYEE_FETCH_SUCC:
      return action.payload // all employees
    default:
      return state
  }
}