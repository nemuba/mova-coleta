import { toast } from 'react-toastify'
import api from '../../../services/api'
import { createAction, updateAction, listAction, deleteAction, setAction } from '../../collects'
import { reject } from '../../../services/functions'
import { push } from 'connected-react-router'

export function listCollects() {
  return dispatch => {
    api.get('/collect/collects')
      .then(res => {
        dispatch(listAction(res.data))
      })
      .catch(error => {
        toast.success('Não foi possível listar os usuários !')
      })
  }
}

export function updateCollect(data) {
  return dispatch => {
    api.put(`/collect/collects/${data.id}`, { collect: reject(data, ['id']) })
      .then(res => {
        dispatch(updateAction(res.data))
        toast.success('Coleta Atualizado !')
      })
      .catch(error => {
        console.log(error)
        toast.error('Não foi possível atualizar coleta !')
      })
  }
}

export function createCollect(data) {
  return dispatch => {
    api.post('/collect/collects', { collect: data })
      .then(res => {
        dispatch(createAction(res.data))
        toast.success('Coleta criado !')
      })
      .catch(error => {
        toast.error('Não foi possível criar coleta !')
      })
  }
}

export function deleteCollect(data) {
  return dispatch => {
    api.delete(`/collect/collects/${data.id}`)
      .then(res => {
        dispatch(deleteAction(data))
        toast.success('Coleta deletado !')
      })
      .catch(error => {
        toast.error('Não foi possível deletar coleta !')
      })
  }
}

export function getCollect(id) {
  return dispatch => {
    api.get(`/collect/collects/${id}`)
      .then(res => {
        dispatch(setAction(res.data))
      })
      .catch(error => {
        toast.error('Não foi possível buscar informação do coleta !')
        dispatch(push('/collects'))
      })
  }
}
