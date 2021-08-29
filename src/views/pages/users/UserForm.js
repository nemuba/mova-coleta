import CIcon from '@coreui/icons-react';
import { CButton, CCol, CFormGroup, CInputGroup, CInputGroupAppend, CInputGroupPrepend, CInputGroupText, CLabel, CRow } from '@coreui/react';
import { Scope } from '@unform/core';
import { Form } from '@unform/web';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GooglePlacesAutocomplete, { geocodeByPlaceId } from 'react-google-places-autocomplete';
import { Input } from '../../../reusable';
import { fetchCreateUser } from '../../../store/users'
import * as Yup from 'yup'
import { useState } from 'react';
import { toast } from 'react-toastify';
import { push } from 'connected-react-router';

const UserForm = ({ title, role }) => {
  const { loading } = useSelector(state => state.users)
  const dispatch = useDispatch()
  const formRef = useRef(null)
  const [value, setValue] = useState(null)

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


      await dispatch(fetchCreateUser(data))
        .unwrap()
        .then(() => {
          toast.success('Usuário criado com sucesso!')
          dispatch(push('/users'))
        })
        .catch(() => {
          toast.error('Erro ao criar usuário!')
        })

    } catch (err) {
      const validationErrors = {};

      if (err instanceof Yup.ValidationError) {
        err.inner.forEach(error => {
          validationErrors[error.path] = error.message;
        });
        formRef.current.setErrors(validationErrors);
      }
    }
  }

  useEffect(() => {
    if (value) {
      console.log(value)
      geocodeByPlaceId(value.value.place_id)
        .then(results => {

          const { address_components, geometry } = results[0]
          const street = address_components.find(component => component.types.includes('route'))
          const neighborhood = address_components.find(component => component.types.includes('sublocality'))
          const city = address_components.find(component => component.types.includes('administrative_area_level_2'))
          const state = address_components.find(component => component.types.includes('administrative_area_level_1'))
          const country = address_components.find(component => component.types.includes('country'))
          const postal_code = address_components.find(component => component.types.includes('postal_code'))

          formRef.current.setData({
            profile_attributes: {
              address_attributes: {
                street: street?.long_name,
                neighborhood: neighborhood?.long_name,
                city: city?.long_name,
                state: state?.long_name,
                country: country?.long_name,
                zip_code: postal_code?.long_name,
                latitude: geometry?.location?.lat(),
                longitude: geometry?.location?.lng(),
              },
            },
          })

        })
        .catch(error => console.error(error));
    }
  }, [value])


  return (
    <CRow>
      <CCol>
        <h3 className="mt-2">{title}</h3>
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
                <Input id={`profile-document-${role}`} name="document" type="text" placeholder={role === 'business' ? 'CNPJ' : 'CPF'} autoComplete="Documento" />
                <CInputGroupAppend>
                  <CInputGroupText><CIcon name="cil-user" /></CInputGroupText>
                </CInputGroupAppend>
              </CInputGroup>
            </CFormGroup>
            <Scope path="address_attributes">
              <h5 className="mt-3">Informações de Endereço</h5>
              <CFormGroup>
                <CLabel>Pesquise pelo endereço:</CLabel>
                <GooglePlacesAutocomplete
                  apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
                  selectProps={{
                    value,
                    onChange: setValue,
                  }}
                />
              </CFormGroup>
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
              <Input type="text" name="latitude" hidden />
              <Input type="text" name="longitude" hidden />
            </Scope>
          </Scope>
          <CFormGroup>
            <CButton disabled={loading} color="primary" type="submit" className="mb-2">Cadastrar</CButton>
          </CFormGroup>
        </Form>
      </CCol>
    </CRow>
  )
}

export default UserForm;
