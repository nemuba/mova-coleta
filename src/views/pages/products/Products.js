import CIcon from '@coreui/icons-react'
import { CButton, CCard, CCardBody, CCardHeader, CCol, CContainer, CDataTable, CRow } from '@coreui/react'
import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { fetchAllProducts } from 'src/store/products'
import Modal from './Modal'

const Products = () => {
  const dispatch = useDispatch(null)
  const history = useHistory()
  const { products, loading } = useSelector(state => state.products)
  const fields = [
    { key: 'name', label: 'Nome', sorter: true, filter: true },
    { key: 'price', label: 'Preço', sorter: true, filter: true },
    { key: 'point', label: 'Ponto', sorter: true, filter: true },
    { key: 'created_at', label: 'Criado em', sorter: true, filter: true },
    { key: 'updated_at', label: 'Atualizado em', sorter: true, filter: true },
    { key: 'options', label: 'Opções', sorter: false, filter: false }
  ]

  useEffect(() => {
    dispatch(fetchAllProducts())
  }, [dispatch])

  return (
    <CContainer>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              <h3>Produtos</h3>
            </CCardHeader>
            <CCardBody>
              <CDataTable
                sorter
                tableFilter={{ label: 'Pesquisar', placeholder: 'Digite o termo' }}
                hover
                footer
                noItemsViewSlot={<h5 className="text-center">Nenhum produto encontrado</h5>}
                items={products || []}
                fields={fields}
                loading={loading}
                scopedSlots={{
                  options: (item) => (
                    <td>
                      <CButton
                        className="m-1"
                        color="primary"
                        size="sm"
                        onClick={() => history.push(`/products/${item.id}`)}
                      >
                        <CIcon name="cil-search" />
                      </CButton>
                      <Modal className="m-1" module={item} title={"Excluir produto ?"} />
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
