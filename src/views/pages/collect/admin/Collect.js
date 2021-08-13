import { CCard, CCardBody, CCardHeader, CCol, CContainer, CRow } from '@coreui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listCollects } from '../../../../store/fetch_actions/collects';
import TableCollect from '../TableCollect';

const Collect = ({ user }) => {
  const { collects } = useSelector(state => state.collects);
  const dispatch = useDispatch();
  const status = 'Aguardando Confirmação';

  useEffect(() => {
    dispatch(listCollects())
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
