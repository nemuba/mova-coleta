import { toast } from 'react-toastify'
import api from '../../../services/api'
import { createAction, updateAction, listAction, deleteAction, setAction } from '../../routes'
import { reject } from '../../../services/functions'
import { push } from 'connected-react-router'

export function listRoutes() {
  return dispatch => {
    api.get('/collect/routes')
      .then(res => {
        dispatch(listAction(res.data))
      })
      .catch(error => {
        toast.success('Não foi possível listar as rotas !')
      })
  }
}

export function updateRoute(data) {
  return dispatch => {
    api.put(`/collect/routes/${data.id}`, { route: reject(data, ['id']) })
      .then(res => {
        dispatch(updateAction(res.data))
        toast.success('Rota Atualizado !')
      })
      .catch(error => {
        console.log(error)
        toast.error('Não foi possível atualizar rota !')
      })
  }
}

export function createRoute(data) {
  return dispatch => {
    api.post('/collect/routes', { route: data })
      .then(res => {
        dispatch(createAction(res.data))
        toast.success('Rota criada !')
      })
      .catch(error => {
        toast.error('Não foi possível criar rota !')
      })
  }
}

export function deleteRoute(data) {
  return dispatch => {
    api.delete(`/collect/routes/${data.id}`)
      .then(res => {
        dispatch(deleteAction(data))
        toast.success('Rota deletada !')
      })
      .catch(error => {
        toast.error('Não foi possível deletar rota !')
      })
  }
}

export function getRoute(id) {
  return dispatch => {
    api.get(`/collect/routes/${id}`)
      .then(res => {
        dispatch(setAction(res.data))
      })
      .catch(error => {
        toast.error('Não foi possível buscar informação da rota !')
        dispatch(push('/routes'))
      })
  }
}
