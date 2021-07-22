import React, { useEffect, useRef } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormGroup,
  CInputGroup,
  CInputGroupAppend,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { Form } from '@unform/web'
import { Input } from '../../../reusable'
import { useDispatch, useSelector } from 'react-redux'
import { createProfile, updateProfile } from '../../../store/fetch_actions/profile'

const Profile = () => {
  const { user } = useSelector(state => state.auth)
  const { profile } = useSelector(state => state.profile)
  const dispatch = useDispatch()
  const formRef = useRef(null)

  const handleSubmit = (data) => {
    if(data.id != null && data.id !== ""){
      dispatch(updateProfile(data))
    }else{
      dispatch(createProfile(data))
    }
  }

 useEffect(() => {
   if (formRef.current && profile?.id != null && user?.id != null) {
      formRef.current.setData({
        id: profile.id,
        user_id: user.id,
        name: profile.name,
        email: profile.email,
        phone: profile.phone,
        document: profile.document
      });
    }
 }, [user, profile]);

  return (
    <>
      <CCard>
        <CCardHeader>
          Perfil
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol>
              <CCard>
                <CCardHeader>
                  Informações de Perfil
                </CCardHeader>
                <CCardBody>
                  <Form onSubmit={handleSubmit} ref={formRef}>
                    <Input name="user_id" hidden value={user?.id}/>
                    <Input name="id" hidden/>
                    <CFormGroup>
                      <CInputGroup>
                        <CInputGroupPrepend>
                          <CInputGroupText>Nome</CInputGroupText>
                        </CInputGroupPrepend>
                        <Input type="text" id="name" name="name" autoComplete="name" />
                        <CInputGroupAppend>
                          <CInputGroupText><CIcon name="cil-user" /></CInputGroupText>
                        </CInputGroupAppend>
                      </CInputGroup>
                    </CFormGroup>
                    <CFormGroup>
                      <CInputGroup>
                        <CInputGroupPrepend>
                          <CInputGroupText>Email</CInputGroupText>
                        </CInputGroupPrepend>
                        <Input type="email" id="email" name="email" autoComplete="Email" />
                        <CInputGroupAppend>
                          <CInputGroupText><CIcon name="cil-envelope-closed" /></CInputGroupText>
                        </CInputGroupAppend>
                      </CInputGroup>
                    </CFormGroup>
                    <CFormGroup>
                      <CInputGroup>
                        <CInputGroupPrepend>
                          <CInputGroupText>Telefone</CInputGroupText>
                        </CInputGroupPrepend>
                        <Input type="phone" id="phone" name="phone" autoComplete="phone" />
                        <CInputGroupAppend>
                          <CInputGroupText><CIcon name="cil-phone" /></CInputGroupText>
                        </CInputGroupAppend>
                      </CInputGroup>
                    </CFormGroup>
                    <CFormGroup>
                      <CInputGroup>
                        <CInputGroupPrepend>
                          <CInputGroupText>(CPF/CNPJ)</CInputGroupText>
                        </CInputGroupPrepend>
                        <Input type="text" id="document" name="document" autoComplete="document" />
                        <CInputGroupAppend>
                          <CInputGroupText><CIcon name="cil-asterisk" /></CInputGroupText>
                        </CInputGroupAppend>
                      </CInputGroup>
                    </CFormGroup>
                    <CFormGroup className="form-actions">
                      <CButton type="submit" size="sm" color="primary">Salvar</CButton>
                    </CFormGroup>
                  </Form>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Profile
