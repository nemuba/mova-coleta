import { goBack, push, } from 'connected-react-router'
import { toast } from 'react-toastify'
import api from '../../../services/api'
import { isAuthenticated, login, logout } from '../../../services/auth'
import { loginAction, logoutAction, signupAction } from '../../auth'

export function loginFetch(data) {
  return dispatch => {
    api.post('/users/sign_in', { auth: data })
      .then(res => {
        login(res.headers['access-token'])
        if (isAuthenticated()) {
          dispatch(loginAction());
          dispatch(push('/'))
          toast.success('Logado com sucesso !')
        } else {
          dispatch(goBack())
        }
      })
      .catch(error => {
        dispatch(goBack())
        console.log(error.message)
      })
  }
}

export function logoutFetch() {
  return dispatch => {
    dispatch(logoutAction())
    logout()
    toast.success('Saiu com sucesso !')
  }
}

export function signupFetch(data) {
  return dispatch => {
    api.post('/users/sign_up', { auth: data })
      .then(res => {
        login(res.headers['access-token'])
        if (isAuthenticated()) {
          dispatch(signupAction());
          dispatch(push('/'))
          toast.success('Conta criada com sucesso !')
        } else {
          dispatch(push('/login'))
        }
      })
      .catch(error => {
        toast.error('Não foi possivel criar sua conta !')
        dispatch(goBack())
        console.log(error.message)
      })
  }
}
