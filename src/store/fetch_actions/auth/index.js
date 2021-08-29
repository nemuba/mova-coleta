import { toast } from 'react-toastify'
import { logout } from '../../../services/auth'
import { logoutAction } from '../../auth'

export function logoutFetch() {
  return dispatch => {
    dispatch(logoutAction())
    logout()
    toast.success('Saiu com sucesso !')
  }
}
