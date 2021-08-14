import { CCard, CCardBody, CCardHeader, CCol, CContainer, CHeader, CRow } from '@coreui/react';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router';
import { getRoute } from '../../../store/fetch_actions/routes';

const RouteDetail = () => {
  const { route } = useSelector(state => state.routes);
  const { params } = useRouteMatch()
  const dispatch = useDispatch(null)

  useEffect(() => {
    if (params && params.id) {
      dispatch(getRoute(params.id))
    }
  }, [params, dispatch])

  return (
    <CContainer>
      <CRow>
        <CCol>
          <CHeader>
            <h2 className="m-3">Detalhes da Rota</h2>
          </CHeader>
          <CCard>
            <CCardBody>
              <p>Data da Coleta: {route?.date_collect} </p>
              <p>Data de Inicio: {route?.date_start} </p>
              <p>Data de Fim: {route?.date_finish} </p>
              <p>Coletor: {route?.user?.email} </p>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
}

export default RouteDetail;
