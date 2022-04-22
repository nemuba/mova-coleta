import CIcon from '@coreui/icons-react'
import { CButton, CCard, CCardBody, CCardHeader, CCol, CContainer, CDataTable, CRow } from '@coreui/react'
import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { fetchAllRecyclables } from 'src/store/recyclables'
import Modal from './Modal'

const options = [
  { value: 'kilogram', label: 'KG' },
  { value: 'gram', label: 'Grama' },
  { value: 'unity', label: 'Unidade' },
]

const Products = () => {
  const dispatch = useDispatch(null)
  const history = useHistory()
  const { recyclables, loading } = useSelector(state => state.recyclables)
  const fields = [
    { key: 'name', label: 'Nome', sorter: true, filter: true },
    { key: 'unit_of_measurement', label: 'Unidade/Medida', sorter: true, filter: true },
    { key: 'measure', label: 'Quantidade', sorter: true, filter: true },
    { key: 'point', label: 'Ponto', sorter: true, filter: true },
    { key: 'created_at', label: 'Criado em', sorter: true, filter: true },
    { key: 'updated_at', label: 'Atualizado em', sorter: true, filter: true },
    { key: 'options', label: 'Opções', sorter: false, filter: false }
  ]

  const getUnitOfMeasurement = (item) => {
    const option = options.find(option => option.value === item.unit_of_measurement)
    return option?.label
  }

  useEffect(() => {
    dispatch(fetchAllRecyclables())
  }, [dispatch])

  return (
    <CContainer>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              <h3>Recicláveis</h3>
            </CCardHeader>
            <CCardBody>
              <CDataTable
                sorter
                tableFilter={{ label: 'Pesquisar', placeholder: 'Digite o termo' }}
                hover
                footer
                noItemsViewSlot={<h5 className="text-center">Nenhum reciclável encontrado</h5>}
                items={recyclables || []}
                fields={fields}
                loading={loading}
                scopedSlots={{
                  unit_of_measurement: (item) => (
                    <td>
                      {getUnitOfMeasurement(item)}
                    </td>
                  ),
                  options: (item) => (
                    <td>
                      <CButton
                        className="m-1"
                        color="primary"
                        size="sm"
                        onClick={() => history.push(`/recyclables/${item.id}`)}
                      >
                        <CIcon name="cil-search" />
                      </CButton>
                      <Modal className="m-1" recyclable={item} title={"Excluir reciclável ?"} />
                    </td>
                  )
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default Products;
