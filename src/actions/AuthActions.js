import firebase from 'firebase'
import { Actions } from 'react-native-router-flux'
import { 
  EMAIL_CHANGED, 
  PASSWORD_CHANGED,
  LOGIN_USER_SUCC,
  LOGIN_USER_FAIL,
  LOGIN_USER
} from './types'

export const emailChanged = email => {
  return {
    type: EMAIL_CHANGED,
    payload: email
  }
}

export const passwordChanged = password => {
  return {
    type: PASSWORD_CHANGED,
    payload: password
  }
}

//redux-thunk async action creator (thunk must be imported and applied as middleware in App.js)
export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER })

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => loginUserSucc(dispatch, user))
      .catch((error) => {
        console.log(error)
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(user => loginUserSucc(dispatch, user))
          .catch((error) => {
            console.log(error)
            loginUserFail(dispatch)
          })
      })
  }
}

const loginUserFail = (dispatch) => {
  dispatch({
    type: LOGIN_USER_FAIL,
    payload: 'Authentication Failed.'
  })
}

const loginUserSucc = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCC,
    payload: user
  })

  Actions.main()
}