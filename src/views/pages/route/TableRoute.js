import CIcon from '@coreui/icons-react'
import { CButton, CDataTable } from '@coreui/react'
import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import Modal from './Modal'
import moment from 'moment'

const TableRoute = ({ routes = [], loading }) => {
  const history = useHistory()

  const fields = [
    { key: 'request_date', label: 'Data da Solicitação', _style: { width: '20%' } },
    { key: 'collect_date', label: 'Data da Coleta', _style: { width: '20%' } },
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
      loading={loading}
      fields={fields}
      items={routes}
      noItemsViewSlot={
        <p className="text-center">
          Nenhuma rota encontrada.
          <Link to="/routes/new"> Cadastrar rota</Link>
        </p>}
      scopedSlots={{
        'user_id': (item) => {
          return <td>{item?.user?.email}</td>
        },
        'request_date': (item) => {
          const date = item.request_date ? moment(item.request_date) : null
          return <td>{date.format('DD/MM/YYYY')}</td>
        },
        'collect_date': (item) => {
          const date = item.collect_date ? moment(item.collect_date) : null
          return <td>{date ? date.format('DD/MM/YYYY') : date}</td>
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

