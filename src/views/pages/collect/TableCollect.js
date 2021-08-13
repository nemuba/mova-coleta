import { CBadge, CDataTable } from '@coreui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { getBadge } from '../../../services/functions'
import Modal from './Modal'

const TableCollect = ({collects, status}) => {

  const fields = [
    { key: 'created_at', label: 'Data da Solicitação' },
    { key: 'note', label: 'Observação' },
    { key: 'collect_status', label: 'Status' },
    { key: 'options', label: 'Opções' },
  ]

  return(
    <CDataTable
      hover
      striped
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

