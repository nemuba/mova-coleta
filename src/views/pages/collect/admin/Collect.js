import { CCard, CCardBody, CCardHeader, CCol, CContainer, CRow } from '@coreui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCollects } from '../../../../store/collects';
import TableCollect from '../TableCollect';

const Collect = ({ user }) => {
  const { collects, loading } = useSelector(state => state.collects);
  const dispatch = useDispatch();
  const status = 'Aguardando Confirmação';

  useEffect(() => {
    dispatch(fetchAllCollects())
  }, [dispatch])

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
                loading={loading}
                status={status}
                admin={true}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
}

export default Collect;
