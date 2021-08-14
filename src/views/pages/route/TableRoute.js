import CIcon from '@coreui/icons-react'
import { CButton, CDataTable } from '@coreui/react'
import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import Modal from './Modal'

const TableRoute = ({ routes }) => {
  const history = useHistory()

  const fields = [
    { key: 'date_collect', label: 'Data da Solicitação', _style: { width: '20%' } },
    { key: 'date_start', label: 'Data de Inicio', _style: { width: '20%' } },
    { key: 'date_finish', label: 'Data de Fim', _style: { width: '20%' } },
    { key: 'user_id', label: 'Coletor', _style: { width: '20%' } },
    { key: 'options', label: 'Opções', sorter: false, filter: false, _style: { width: '20%' } },
  ]

  const viewRoute = (row) => {
    history.push(`/routes/${row.id}`)
  }

  return (
    <CDataTable
      hover
      tableFilter={{ label: "Pesquisar:", placeholder: "Digite um termo para busca" }}
      sorter
      striped
      footer
      fields={fields}
      items={routes}
      noItemsViewSlot={
        <p className="text-center">
          Nenhuma rota encontrada.
          <Link to="/routes/new"> Cadastrar rota</Link>
        </p>}
      scopedSlots={{
        'user_id': (item) => {
          return <td>{item.user.email}</td>
        },
        'date_start': (item) => {
          return <td>{item.date_start}</td>
        },
        'date_finish': (item) => {
          return <td>{item.date_end}</td>
        },
        'options': (item) => (
          <td>
            <CButton title="Visualizar" size="sm" color="primary" className="mr-1" onClick={() => viewRoute(item)}>
              <CIcon name="cil-search" />
            </CButton>
            <Modal route={item} title="Excluir rota" />
          </td>
        )
      }}
    />
  )
}

export default TableRoute

