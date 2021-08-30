import CIcon from '@coreui/icons-react'
import { CButton, CCard, CCardBody, CCardHeader, CCol, CContainer, CDataTable, CRow } from '@coreui/react'
import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { fetchAllSystemModules } from 'src/store/system_modules'
import Modal from './Modal'

const Modules = () => {
  const dispatch = useDispatch(null)
  const history = useHistory()
  const { system_modules, loading } = useSelector(state => state.system_modules)
  const fields = [
    { key: 'name', label: 'Nome', sorter: true, filter: true },
    { key: 'created_at', label: 'Criado em', sorter: true, filter: true },
    { key: 'updated_at', label: 'Atualizado em', sorter: true, filter: true },
    { key: 'options', label: 'Opções', sorter: false, filter: false }
  ]

  useEffect(() => {
    dispatch(fetchAllSystemModules())
  }, [dispatch])

  return (
    <CContainer>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              <h3>Módulos</h3>
            </CCardHeader>
            <CCardBody>
              <CDataTable
                sorter
                tableFilter={{ label: 'Pesquisar', placeholder: 'Digite o termo' }}
                hover
                footer
                noItemsViewSlot={<h5 className="text-center">Nenhum módulo encontrado</h5>}
                items={system_modules || []}
                fields={fields}
                loading={loading}
                scopedSlots={{
                  options: (item) => (
                    <td>
                      <CButton
                        className="m-1"
                        color="primary"
                        size="sm"
                        onClick={() => history.push(`/modules/${item.id}`)}
                      >
                        <CIcon name="cil-search" />
                      </CButton>
                      <Modal className="m-1" module={item} title={"Excluir módulo ?"} />
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

export default Modules;
