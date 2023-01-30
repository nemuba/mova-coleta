import { CDataTable } from '@coreui/react'
import { Link } from 'react-router-dom'

const ExchangeTable = ({ histories = [], loading }) => {

  const fields = [
    { key: 'user_id', label: 'Cliente', _style: { width: '20%' } },
    { key: 'product_id', label: 'Produto', _style: { width: '20%' } },
    { key: 'quantity', label: 'Quantidade', _style: { width: '20%' } },
    { key: 'total_points', label: 'Pontos', _style: { width: '20%' } },
  ]

  return (
    <CDataTable
      hover
      tableFilter={{ label: "Pesquisar:", placeholder: "Digite um termo para busca" }}
      sorter
      striped
      footer
      loading={loading}
      fields={fields}
      items={histories}
      noItemsViewSlot={
        <p className="text-center">
          Nenhuma item encontrada.
          <Link to="/exchange/new"> Trocar Pontos</Link>
        </p>}
      scopedSlots={{
        'user_id': (item) => {
          return <td>{item?.user?.email}</td>
        },
        'product_id': (item) => {
          return <td>{item?.product?.name}</td>
        },
        'quantity': (item) => {
          return <td>{item?.quantity}</td>
        },
        'total_points': (item) => {
          return <td>{item?.total_points}</td>
        }
      }}
    />
  )
}

export default ExchangeTable

