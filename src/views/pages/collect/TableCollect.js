import { CBadge, CDataTable } from '@coreui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { getBadge } from '../../../services/functions'
import Modal from './Modal'

const TableCollect = ({ collects, status }) => {
  const fields = [
    { key: 'created_at', label: 'Data da Solicitação', _style: { width: '20%' } },
    { key: 'note', label: 'Observação', _style: { width: '20%' } },
    { key: 'collect_status', label: 'Status', _style: { width: '20%' } },
    { key: 'options', label: 'Opções', sorter: false, filter: false, _style: { width: '20%' } },
  ]

  return(
    <CDataTable
      hover
      tableFilter={{ label: "Pesquisar:", placeholder: "Digite um termo para busca" }}
      sorter
      striped
      footer
      fields={fields}
      items={collects}
      noItemsViewSlot={
        <p className="text-center">
          Nenhuma coleta encontrada.
          <Link to="/collects/new"> Cadastrar solicitação</Link>
        </p>}
      scopedSlots={{
        'collect_status': (item) => {
          return (
            <td>
              <CBadge color={getBadge(item.collect_status.name)} className="p-2">
                {item.collect_status.name}
              </CBadge>
            </td>
          )
        },
        'options': (item) => {
          return (
            <td>
              <Modal collect={item} title="Excluir solicitação de coleta" status={status} />
            </td>
          )
        }
      }}
    />
  )
}

export default TableCollect

