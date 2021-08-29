import { CCard, CCardBody, CCardHeader, CCol, CContainer, CRow } from '@coreui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllRoutes } from '../../../store/routes';
import TableCollect from './TableRoute';

const Route = () => {
  const { routes, loading } = useSelector(state => state.routes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllRoutes())
  }, [dispatch])

  return (
    <CContainer>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              <h3>Histórico de Rotas</h3>
            </CCardHeader>
            <CCardBody>
              <TableCollect
                loading={loading}
                routes={routes}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
}

export default Route;
