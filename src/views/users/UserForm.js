import CIcon from '@coreui/icons-react';
import { CButton, CCol, CFormGroup, CHeader, CInputGroup, CInputGroupAppend, CInputGroupPrepend, CInputGroupText, CRow } from '@coreui/react';
import { Scope } from '@unform/core';
import { Form } from '@unform/web';
import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Input } from 'src/reusable';
import { createUser } from '../../store/fetch_actions/users'
import * as Yup from 'yup'

const UserForm = ({ title, role }) => {
  const dispatch = useDispatch()
  const formRef = useRef(null)

  const handleSubmit = async (data, { reset }) => {
    try {
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string().email().required('Email Obrigatório'),
        password: Yup.string().required('Senha Obrigatória'),
        password_confirmation: Yup.mixed().oneOf([Yup.ref('password')], 'A senha deve ser idêntica'),
        profile_attributes: Yup.object().shape({
          name: Yup.string().required('Nome Obrigatório'),
          email: Yup.string().email().required('Email Obrigatório'),
          phone: Yup.string().required('Telefone Obrigatório'),
          document: Yup.string().required('Número de documento obrigatório'),
          address_attributes: Yup.object().shape({
            street: Yup.string().required('Rua Obrigatória'),
            number: Yup.string().required('Número Obrigatório'),
            neighborhood: Yup.string().required('Bairro Obrigatório'),
            city: Yup.string().required('Cidade Obrigatória'),
            state: Yup.string().required('Estado Obrigatório'),
            country: Yup.string().required('País Obrigatório'),
            zip_code: Yup.string().required('CEP Obrigatório')
          })
        }),
      });

      await schema.validate(data, {
        abortEarly: false,
      });


      dispatch(createUser(data))

      reset()
    } catch (err) {
      const validationErrors = {};

      if (err instanceof Yup.ValidationError) {
        err.inner.forEach(error => {
          validationErrors[error.path] = error.message;
        });
        formRef.current.setErrors(validationErrors);
      }
    }
  };

  return (
    <CRow>
      <CCol>
        <CHeader>
          <h3 className="mt-2">{title}</h3>
        </CHeader>
        <h5 className="mt-3">Informações de Usuário</h5>
        <Form onSubmit={handleSubmit} ref={formRef}>
          <Input name="role" defaultValue={role} hidden />
          <CFormGroup>
            <CInputGroup>
              <CInputGroupPrepend>
                <CInputGroupText>@</CInputGroupText>
              </CInputGroupPrepend>
              <Input type="email" id={`email-${role}`} name="email" autoComplete="Email" placeholder="Email" />
              <CInputGroupAppend>
                <CInputGroupText><CIcon name="cil-envelope-closed" /></CInputGroupText>
              </CInputGroupAppend>
            </CInputGroup>
          </CFormGroup>
          <CFormGroup>
            <CInputGroup className="mb-3">
              <CInputGroupPrepend>
                <CInputGroupText>
                  <CIcon name="cil-lock-locked" />
                </CInputGroupText>
              </CInputGroupPrepend>
              <Input id={`password-${role}`} name="password" type="password" placeholder="Senha" autoComplete="new-password" />
              <CInputGroupAppend>
                <CInputGroupText><CIcon name="cil-asterisk" /></CInputGroupText>
              </CInputGroupAppend>
            </CInputGroup>
          </CFormGroup>
          <CFormGroup>
            <CInputGroup className="mb-4">
              <CInputGroupPrepend>
                <CInputGroupText>
                  <CIcon name="cil-lock-locked" />
                </CInputGroupText>
              </CInputGroupPrepend>
              <Input id={`password-confirmation-${role}`} name="password_confirmation" type="password" placeholder="Repita Senha" autoComplete="new-password" />
              <CInputGroupAppend>
                <CInputGroupText><CIcon name="cil-asterisk" /></CInputGroupText>
              </CInputGroupAppend>
            </CInputGroup>
          </CFormGroup>
          <h5 className="mt-3">Informações do Perfil</h5>
          <Scope path="profile_attributes">
            <CFormGroup>
              <CInputGroup className="mb-4">
                <CInputGroupPrepend>
                  <CInputGroupText>
                    Nome
                  </CInputGroupText>
                </CInputGroupPrepend>
                <Input id={`profile-name-${role}`} name="name" type="text" placeholder="Nome" autoComplete="new-password" />
                <CInputGroupAppend>
                  <CInputGroupText><CIcon name="cil-user" /></CInputGroupText>
                </CInputGroupAppend>
              </CInputGroup>
            </CFormGroup>
            <CFormGroup>
              <CInputGroup className="mb-4">
                <CInputGroupPrepend>
                  <CInputGroupText>
                    Email
                  </CInputGroupText>
                </CInputGroupPrepend>
                <Input id={`profile-email-${role}`} name="email" type="email" placeholder="Email" autoComplete="Email" />
                <CInputGroupAppend>
                  <CInputGroupText><CIcon name="cil-user" /></CInputGroupText>
                </CInputGroupAppend>
              </CInputGroup>
            </CFormGroup>
            <CFormGroup>
              <CInputGroup className="mb-4">
                <CInputGroupPrepend>
                  <CInputGroupText>
                    Telefone
                  </CInputGroupText>
                </CInputGroupPrepend>
                <Input id={`profile-phone-${role}`} name="phone" type="text" placeholder="Telefone" autoComplete="Telefone" />
                <CInputGroupAppend>
                  <CInputGroupText><CIcon name="cil-user" /></CInputGroupText>
                </CInputGroupAppend>
              </CInputGroup>
            </CFormGroup>
            <CFormGroup>
              <CInputGroup className="mb-4">
                <CInputGroupPrepend>
                  <CInputGroupText>
                    { role === 'business' ? 'CNPJ' : 'CPF'}
                  </CInputGroupText>
                </CInputGroupPrepend>
                <Input id={`profile-document-${role}`} name="document" type="text" placeholder="Documento(CPF/CNPJ)" autoComplete="Documento" />
                <CInputGroupAppend>
                  <CInputGroupText><CIcon name="cil-user" /></CInputGroupText>
                </CInputGroupAppend>
              </CInputGroup>
            </CFormGroup>
            <Scope path="address_attributes">
              <h5 className="mt-3">Informações de Endereço</h5>
              <CFormGroup>
                <CInputGroup className="mb-4">
                  <CInputGroupPrepend>
                    <CInputGroupText>
                      Rua
                    </CInputGroupText>
                  </CInputGroupPrepend>
                  <Input id={`address-street-${role}`} name="street" type="text" placeholder="Rua" autoComplete="Rua" />
                  <CInputGroupAppend>
                    <CInputGroupText><CIcon name="cil-location-pin" /></CInputGroupText>
                  </CInputGroupAppend>
                </CInputGroup>
              </CFormGroup>
              <CFormGroup>
                <CInputGroup className="mb-4">
                  <CInputGroupPrepend>
                    <CInputGroupText>
                      Número
                    </CInputGroupText>
                  </CInputGroupPrepend>
                  <Input id={`address-number-${role}`} name="number" type="text" placeholder="Número" autoComplete="Número" />
                  <CInputGroupAppend>
                    <CInputGroupText><CIcon name="cil-location-pin" /></CInputGroupText>
                  </CInputGroupAppend>
                </CInputGroup>
              </CFormGroup>
              <CFormGroup>
                <CInputGroup className="mb-4">
                  <CInputGroupPrepend>
                    <CInputGroupText>
                      Bairro
                    </CInputGroupText>
                  </CInputGroupPrepend>
                  <Input id={`address-neighbor-${role}`} name="neighborhood" type="text" placeholder="Bairro" autoComplete="Bairro" />
                  <CInputGroupAppend>
                    <CInputGroupText><CIcon name="cil-location-pin" /></CInputGroupText>
                  </CInputGroupAppend>
                </CInputGroup>
              </CFormGroup>
              <CFormGroup>
                <CInputGroup className="mb-4">
                  <CInputGroupPrepend>
                    <CInputGroupText>
                      Cidade
                    </CInputGroupText>
                  </CInputGroupPrepend>
                  <Input id={`address-city-${role}`} name="city" type="text" placeholder="Cidade" autoComplete="Cidade" />
                  <CInputGroupAppend>
                    <CInputGroupText><CIcon name="cil-location-pin" /></CInputGroupText>
                  </CInputGroupAppend>
                </CInputGroup>
              </CFormGroup>
              <CFormGroup>
                <CInputGroup className="mb-4">
                  <CInputGroupPrepend>
                    <CInputGroupText>
                      Estado
                    </CInputGroupText>
                  </CInputGroupPrepend>
                  <Input id={`address-state-${role}`} name="state" type="text" placeholder="Estado" autoComplete="Estado" />
                  <CInputGroupAppend>
                    <CInputGroupText><CIcon name="cil-location-pin" /></CInputGroupText>
                  </CInputGroupAppend>
                </CInputGroup>
              </CFormGroup>
              <CFormGroup>
                <CInputGroup className="mb-4">
                  <CInputGroupPrepend>
                    <CInputGroupText>
                      Pais
                    </CInputGroupText>
                  </CInputGroupPrepend>
                  <Input id={`address-country-${role}`} name="country" type="text" placeholder="Pais" autoComplete="Pais" />
                  <CInputGroupAppend>
                    <CInputGroupText><CIcon name="cil-location-pin" /></CInputGroupText>
                  </CInputGroupAppend>
                </CInputGroup>
              </CFormGroup>
              <CFormGroup>
                <CInputGroup className="mb-4">
                  <CInputGroupPrepend>
                    <CInputGroupText>
                      CEP
                    </CInputGroupText>
                  </CInputGroupPrepend>
                  <Input id={`address-zipcode-${role}`} name="zip_code" type="text" placeholder="CEP" autoComplete="CEP" />
                  <CInputGroupAppend>
                    <CInputGroupText><CIcon name="cil-location-pin" /></CInputGroupText>
                  </CInputGroupAppend>
                </CInputGroup>
              </CFormGroup>
            </Scope>
          </Scope>
          <CFormGroup>
            <CButton color="primary" type="submit" className="mb-2">Cadastrar</CButton>
          </CFormGroup>
        </Form>
      </CCol>
    </CRow>
  )
}

export default UserForm;
