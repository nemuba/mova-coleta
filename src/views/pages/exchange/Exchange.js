import { CCard, CCardBody, CCardHeader, CCol, CContainer, CRow } from '@coreui/react';
import { useSelector } from 'react-redux';
import ExchangeTable from './ExchangeTable';

const Exchange = () => {
  const { user, loading } = useSelector(state => state.auth)

  return (
    <CContainer>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              <h3>Histórico de Troca de pontos</h3>
            </CCardHeader>
            <CCardBody>
              <ExchangeTable
                histories={user?.product_user_histories}
                loading={loading}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
}

export default Exchange;
