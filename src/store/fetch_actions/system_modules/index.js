import { toast } from 'react-toastify'
import api from '../../../services/api'
import { createAction, updateAction, listAction, deleteAction } from '../../system_modules'
import { reject } from '../../../services/functions'

export function listModules() {
  return dispatch => {
    api.get('/systemmodules')
      .then(res => {
        dispatch(listAction(res.data))
      })
      .catch(error => {
        toast.success('Não foi possível listar os módulos !')
      })
  }
}

export function updateModule(data) {
  return dispatch => {
    api.put(`/systemmodules/${data.id}`, { system_module: reject(data, ['id']) })
      .then(res => {
        dispatch(updateAction(res.data))
        toast.success('Módulo Atualizado !')
      })
      .catch(error => {
        console.log(error)
        toast.error('Não foi possível atualizar o módulo !')
      })
  }
}

export function createModule(data) {
  return dispatch => {
    api.post('/systemmodules', { system_module: data })
      .then(res => {
        dispatch(createAction(res.data))
        toast.success('Usuário criado !')
      })
      .catch(error => {
        toast.error('Não foi possível criar módulo !')
      })
  }
}

export function deleteModule(data) {
  return dispatch => {
    api.delete(`/systemmodules/${data.id}`)
      .then(res => {
        dispatch(deleteAction(res.data))
        toast.success('Módulo deletado !')
      })
      .catch(error => {
        toast.error('Não foi possível deletar módulo !')
      })
  }
}
