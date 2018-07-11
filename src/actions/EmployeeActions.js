import firebase from 'firebase'
import track from '../Amplitude'
import { Actions } from 'react-native-router-flux'
import {
  UPDATE_EMPLOYEE,
  EMPLOYEE_FETCH_SUCC,
  EMPLOYEE_FORM_CLEAR
} from './types'

export const employeeUpdate = ({ prop, value }) => {
  return {
    type: UPDATE_EMPLOYEE,
    payload: { prop, value }
  }
}

export const employeeCreate = ({ name, phone, shift }) => {
  const { currentUser } = firebase.auth()

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/employees`)
      .push({ name, phone, shift })
      .then(() => { 
        track({
          event_type: 'new_hire',
          user: currentUser,
          name, phone, shift
        })
        dispatch({ type: EMPLOYEE_FORM_CLEAR })
        Actions.pop() 
      })
  }
}

export const employeeFetch = () => {
  const { currentUser } = firebase.auth()

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/employees`)
      .on('value', snapshot => {
        dispatch({ type: EMPLOYEE_FETCH_SUCC, payload: snapshot.val() })
      })
  }
}

export const employeeSave = ({ name, phone, shift, uid }) => {
  const { currentUser } = firebase.auth()
  
  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
      .set({ name, phone, shift })
      .then(() => {
        track({
          event_type: 'shift_changed',
          user: currentUser,
          name, phone, shift
        })
        dispatch({ type: EMPLOYEE_FORM_CLEAR })
        Actions.pop()
      })
  }
}

export const employeeFormClear = () => {
  return {
    type: EMPLOYEE_FORM_CLEAR
  }
}

export const employeeDelete = ({ uid }) => {
  const { currentUser } = firebase.auth()

  return () => { // dispatch is not required as .on('value'...) [line 34] will trigger from firebase remove
    firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
      .remove()
      .then(() => {
        track({
          event_type: 'lay_off',
          user: currentUser
        })
        Actions.pop()
      })
  }
}