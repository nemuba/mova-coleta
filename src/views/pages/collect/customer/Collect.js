import { CBadge, CCard, CCardBody, CCardHeader, CCol, CContainer, CDataTable, CRow } from '@coreui/react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from './Modal';

const Collect = () => {
  const { user } = useSelector(state => state.auth);
  const [collects, setCollects] = useState([])

  const fields = [
    { key: 'created_at', label: 'Data da Solicitação' },
    { key: 'note', label: 'Observação' },
    { key: 'collect_status', label: 'Status' },
    { key: 'options', label: 'Opções' },
  ]

  const getBadge = (status) => {
    switch (status) {
      case 'Coletado': return 'success'
      case 'Aguardando Coleta': return 'warning'
      case 'Aguardando Confirmação': return 'danger'
      default: return 'primary'
    }
  }

  const status = 'Aguardando Confirmação';

  useEffect(() => {
    if (user && user.collects) {
      setCollects(user.collects)
    }
  }, [user])

  return (
    <CContainer>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              <h3>Histórico de solicitações</h3>
            </CCardHeader>
            <CCardBody>
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

            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
}

export default Collect;
