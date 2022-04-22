import { CCard, CCardBody, CCardHeader, CCol, CContainer, CRow } from '@coreui/react';
import React, { useEffect, useState } from 'react';
import TableCollect from '../TableCollect';

const Collect = ({user}) => {
  const [collects, setCollects] = useState([])
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
              <TableCollect
                collects={collects}
                status={status}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
}

export default Collect;
