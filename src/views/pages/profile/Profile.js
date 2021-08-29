import React, { useEffect, useRef, useState } from 'react'
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
import GooglePlacesAutocomplete, { geocodeByPlaceId } from 'react-google-places-autocomplete';

import { Input } from '../../../reusable'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAddProfile, fetchUpdateProfile } from '../../../store/profile'
import * as Yup from 'yup'
import { toast } from 'react-toastify'

const Profile = () => {
  const { profile, loading } = useSelector(state => state.profile)
  const dispatch = useDispatch()
  const formRef = useRef(null)
  const [value, setValue] = useState(null)

  const handleSubmit = async (data) => {
    try {
      console.log(data)
      const schema = Yup.object().shape({
        id: Yup.string().nullable(),
        email: Yup.string().email().required('Email obrigatório'),
        name: Yup.string()
          .required('Nome obrigatório'),
        phone: Yup.string()
          .required('Telefone obrigatório'),
        document: Yup.string()
          .required('Documento obrigatório'),
        address_attributes: Yup.object().shape({
          id: Yup.string().nullable(),
          number: Yup.string().required('Número Obrigatório'),
          street: Yup.string().required('Rua Obrigatório'),
          neighborhood: Yup.string().required('Bairro Obrigatório'),
          city: Yup.string().required('Cidade Obrigatório'),
          state: Yup.string().required('Estado Obrigatório'),
          country: Yup.string().required('País Obrigatório'),
          zip_code: Yup.string().required('CEP Obrigatório'),
        }),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      if (data.id != null && data.id !== "") {
        await dispatch(fetchUpdateProfile(data))
          .unwrap()
          .then(() => {
            toast.success('Perfil atualizado com sucesso!')
          })
          .catch(() => {
            toast.error('Erro ao atualizar perfil!')
          })
      } else {
        await dispatch(fetchAddProfile(data))
          .unwrap()
          .then(() => {
            toast.success('Perfil cadastrado com sucesso!')
          })
          .catch(() => {
            toast.error('Erro ao cadastrar perfil!')
          })
      }
    } catch (err) {
      console.log(err)
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
   if (profile) {
      formRef.current.setData({
        id: profile?.id,
        name: profile?.name,
        email: profile?.email,
        phone: profile?.phone,
        document: profile?.document,
        address_attributes: {
          id: profile?.address?.id,
          street: profile?.address?.street,
          number: profile?.address?.number,
          neighborhood: profile?.address?.neighborhood,
          city: profile?.address?.city,
          state: profile?.address?.state,
          zip_code: profile?.address?.zip_code,
          country: profile?.address?.country,
        }
      });
    }
 }, [profile]);

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
            address_attributes: {
              street: street?.long_name,
              neighborhood: neighborhood?.long_name,
              city: city?.long_name,
              state: state?.long_name,
              country: country?.long_name,
              zip_code: postal_code?.long_name,
              latitude: geometry?.location?.lat(),
              longitude: geometry?.location?.lng(),
            }
          })

        })
        .catch(error => console.error(error));
    }
  }, [value])

  return (
    <CContainer>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              Informações do usuário
            </CCardHeader>
            <CCardBody>
              <Form onSubmit={handleSubmit} ref={formRef}>
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
                <Scope path="address_attributes">
                  <CCard>
                    <CCardHeader>
                      Endereço
                    </CCardHeader>
                    <CCardBody>
                      <Input name="id" hidden />
                      <CFormGroup>
                        <GooglePlacesAutocomplete
                          apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
                          selectProps={{
                            value,
                            onChange: setValue,
                          }}
                        />
                      </CFormGroup>
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
                      <Input type="text" name="latitude" hidden />
                      <Input type="text" name="longitude" hidden />
                    </CCardBody>
                  </CCard>
                </Scope>
                <CFormGroup className="form-actions">
                  <CButton disabled={loading} type="submit" size="sm" color="primary">Salvar</CButton>
                </CFormGroup>
              </Form>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default Profile
