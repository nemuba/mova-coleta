import { toast } from 'react-toastify'
import api from '../../../services/api'
import {createAction, updateAction} from '../../profile'

export function createProfile(data) {
  return dispatch => {
    api.post('/collect/profiles', { profile: data })
      .then(res => {
        dispatch(createAction(res.data))
        toast.success('Perfil atualizado !')
      })
      .catch(error => {
        toast.success('Não foi possível atualizar seu perfil !')
      })
  }
}

export function updateProfile(data) {
  return dispatch => {
    api.put(`/collect/profiles/${data.id}`, { profile: data })
      .then(res => {
        dispatch(updateAction(res.data))
        toast.success('Perfil atualizado !')
      })
      .catch(error => {
        toast.error('Não foi possível atualizar seu perfil !')
      })
  }
}
