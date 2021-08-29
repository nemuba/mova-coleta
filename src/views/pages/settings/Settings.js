import CIcon from '@coreui/icons-react';
import { CButton, CCard, CCardBody, CCardHeader, CCol, CContainer, CDataTable, CRow } from '@coreui/react';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fetchAllSettings } from '../../../store/settings';
import Modal from './Modal';

const Settings = () => {
  const { settings, loading, error } = useSelector(state => state.settings);
  const dispatch = useDispatch(null);
  const history = useHistory();

  const fields = [
    { key: 'system_module', label: 'Módulo', sorter: true, filter: true },
    { key: 'param', label: 'Parâmetro', sorter: true, filter: true },
    { key: 'value', label: 'Valor', sorter: true, filter: true },
    { key: 'options', label: 'Opções', sorter: false, filter: false },
  ]

  useEffect(() => {
    dispatch(fetchAllSettings())
  }, [dispatch])

  useEffect(() => {
    toast.error(error)
  }, [error])

  return (
    <CContainer>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              <h3>Configurações</h3>
            </CCardHeader>
            <CCardBody>
              <CDataTable
                items={settings}
                fields={fields}
                sorter
                footer
                striped
                hover
                tableFilter={{ label: 'Pesquisar', placeholder: 'Digite o termo' }}
                loading={loading}
                noItemsViewSlot={<h5 className="text-center">Nenhuma configuração cadastrada!</h5>}
                scopedSlots={{
                  options: (item) => (
                    <td>
                      <CButton
                        className="m-1"
                        size="sm"
                        color="primary"
                        onClick={() => history.push(`/settings/${item.id}`)}
                      >
                        <CIcon name="cil-search" />
                      </CButton>
                      <Modal setting={item} title="Remover configuração ?" />
                    </td>
                  ),
                  system_module: (item) => (
                    <td>{item?.system_module?.name}</td>
                  ),
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
}

export default Settings;
