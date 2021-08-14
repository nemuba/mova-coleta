import { CCard, CCardBody, CCardHeader, CCol, CContainer, CRow } from '@coreui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listRoutes } from '../../../store/fetch_actions/routes';
import TableCollect from './TableRoute';

const Route = () => {
  const { routes } = useSelector(state => state.routes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listRoutes())
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
