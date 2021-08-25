import CIcon from '@coreui/icons-react';
import { CButton, CCard, CCardBody, CCardHeader, CCol, CContainer, CFormGroup, CInput, CRow } from '@coreui/react';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify'

const Invite = () => {
  const { user } = useSelector(state => state.auth);
  const [invite, setInvite] = useState('');

  useEffect(() => {
    if (user) {
      setInvite(`${window.location.origin}/register?invite=${user?.token}`)
    }
  }, [user]);

  const handleCopy = () => {
    navigator.clipboard.writeText(invite).then(() => {
      toast.success('Link copiado !');
    })
  }

  return (
    <CContainer>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              <h1>Convidar cliente</h1>
            </CCardHeader>
            <CCardBody>
              <CFormGroup row className="justify-content-center p-2">
                <CCol lg="10" md="8" sm="8">
                  <CInput type="text" disabled defaultValue={invite} className="mt-2" />
                </CCol>

                <CCol lg="2" md="4" sm="4">
                  <CButton color="success" type="submit" onClick={handleCopy} className="mt-2">
                    Copiar Link
                    <CIcon name="cil-copy" className="ml-1" />
                  </CButton>
                </CCol>
              </CFormGroup>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
}

export default Invite;
