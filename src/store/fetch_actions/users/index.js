import { toast } from 'react-toastify'
import api from '../../../services/api'
import { createAction, updateAction, listAction, deleteAction } from '../../users'
import {reject} from '../../../services/functions'

export function listUsers() {
  return dispatch => {
    api.get('/collect/users')
      .then(res => {
        dispatch(listAction(res.data))
      })
      .catch(error => {
        toast.success('Não foi possível listar os usuários !')
      })
  }
}

export function updateUser(data) {
  return dispatch => {
    api.put(`/collect/users/${data.id}`, { user: reject(data, ['id']) })
      .then(res => {
        dispatch(updateAction(res.data))
        toast.success('Usuário Atualizado !')
      })
      .catch(error => {
        console.log(error)
        toast.error('Não foi possível atualizar usuário !')
      })
  }
}

export function createUser(data) {
  return dispatch => {
    api.post('/collect/users', { user: data })
      .then(res => {
        dispatch(createAction(res.data))
        toast.success('Usuário criado !')
      })
      .catch(error => {
        toast.error('Não foi possível criar usuário !')
      })
  }
}

export function deleteUser(data) {
  return dispatch => {
    api.delete(`/collect/users/${data.id}`)
      .then(res => {
        dispatch(deleteAction(res.data))
        toast.success('Usuário deletado !')
      })
      .catch(error => {
        toast.error('Não foi possível deletar usuário !')
      })
  }
}
