import React, { useEffect, useRef } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CFormGroup,
  CInputGroup,
  CInputGroupAppend,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { Form } from '@unform/web'
import { Scope } from '@unform/core'
import { Input, InputPhone } from '../../../reusable'
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
        document: profile.document,
        address_attributes: {
          id: profile.address?.id,
          street: profile.address?.street,
          number: profile.address?.number,
          neighborhood: profile.address?.neighborhood,
          city: profile.address?.city,
          state: profile.address?.state,
          zip_code: profile.address?.zip_code,
          country: profile.address?.country,
        }
      });
    }
 }, [user, profile]);

  return (
    <CContainer>
      <CRow>
        <CCol>
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
                        <Input name="user_id" hidden value={user?.id} />
                        <Input name="id" hidden />
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
                            <InputPhone type="phone" id="phone" name="phone" autoComplete="phone" value={profile?.phone}/>
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
                        <Scope path="address_attributes">
                          <CCard>
                            <CCardHeader>
                              Endereço
                            </CCardHeader>
                            <CCardBody>
                              <Input name="id" hidden />
                              <CFormGroup>
                                <CInputGroup>
                                  <CInputGroupPrepend>
                                    <CInputGroupText>Rua</CInputGroupText>
                                  </CInputGroupPrepend>
                                  <Input type="text" id="street" name="street" autoComplete="street" />
                                  <CInputGroupAppend>
                                    <CInputGroupText><CIcon name="cil-location-pin" /></CInputGroupText>
                                  </CInputGroupAppend>
                                </CInputGroup>
                              </CFormGroup>
                              <CFormGroup>
                                <CInputGroup>
                                  <CInputGroupPrepend>
                                    <CInputGroupText>Número</CInputGroupText>
                                  </CInputGroupPrepend>
                                  <Input type="text" id="number" name="number" autoComplete="number" />
                                  <CInputGroupAppend>
                                    <CInputGroupText><CIcon name="cil-location-pin" /></CInputGroupText>
                                  </CInputGroupAppend>
                                </CInputGroup>
                              </CFormGroup>
                              <CFormGroup>
                                <CInputGroup>
                                  <CInputGroupPrepend>
                                    <CInputGroupText>Bairro</CInputGroupText>
                                  </CInputGroupPrepend>
                                  <Input type="text" id="neighborhood" name="neighborhood" autoComplete="neighborhood" />
                                  <CInputGroupAppend>
                                    <CInputGroupText><CIcon name="cil-location-pin" /></CInputGroupText>
                                  </CInputGroupAppend>
                                </CInputGroup>
                              </CFormGroup>
                              <CFormGroup>
                                <CInputGroup>
                                  <CInputGroupPrepend>
                                    <CInputGroupText>Cidade</CInputGroupText>
                                  </CInputGroupPrepend>
                                  <Input type="text" id="city" name="city" autoComplete="city" />
                                  <CInputGroupAppend>
                                    <CInputGroupText><CIcon name="cil-location-pin" /></CInputGroupText>
                                  </CInputGroupAppend>
                                </CInputGroup>
                              </CFormGroup>
                              <CFormGroup>
                                <CInputGroup>
                                  <CInputGroupPrepend>
                                    <CInputGroupText>Estado</CInputGroupText>
                                  </CInputGroupPrepend>
                                  <Input type="text" id="state" name="state" autoComplete="state" />
                                  <CInputGroupAppend>
                                    <CInputGroupText><CIcon name="cil-location-pin" /></CInputGroupText>
                                  </CInputGroupAppend>
                                </CInputGroup>
                              </CFormGroup>
                              <CFormGroup>
                                <CInputGroup>
                                  <CInputGroupPrepend>
                                    <CInputGroupText>Pais</CInputGroupText>
                                  </CInputGroupPrepend>
                                  <Input type="text" id="country" name="country" autoComplete="country" />
                                  <CInputGroupAppend>
                                    <CInputGroupText><CIcon name="cil-location-pin" /></CInputGroupText>
                                  </CInputGroupAppend>
                                </CInputGroup>
                              </CFormGroup>
                              <CFormGroup>
                                <CInputGroup>
                                  <CInputGroupPrepend>
                                    <CInputGroupText>CEP</CInputGroupText>
                                  </CInputGroupPrepend>
                                  <Input type="text" id="zip_code" name="zip_code" autoComplete="zip_code" />
                                  <CInputGroupAppend>
                                    <CInputGroupText><CIcon name="cil-location-pin" /></CInputGroupText>
                                  </CInputGroupAppend>
                                </CInputGroup>
                              </CFormGroup>
                            </CCardBody>
                          </CCard>
                        </Scope>
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
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default Profile
