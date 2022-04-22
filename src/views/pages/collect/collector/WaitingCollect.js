import { CCard, CCardHeader, CContainer } from '@coreui/react';
import React from 'react';

const WaitingCollect = ({ collect }) => {
  return (
    <CContainer>
      <CCard>
        <CCardHeader align="center">
          <h3>Data Solicitação: {collect?.created_at}</h3>
          <h4 className="text-success">Solicitação efetuada, disponibilizaremos em breve a data da coleta !!</h4>
        </CCardHeader>
      </CCard>
    </CContainer>
  );
}

export default WaitingCollect;
