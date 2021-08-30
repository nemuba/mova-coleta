import React, { useEffect, useRef, useState } from 'react'
import { CButton, CCard, CCardBody, CCardHeader, CCol, CFormGroup, CInputGroup, CInputGroupPrepend, CInputGroupText, CLabel, CLink, CRow } from '@coreui/react'
import { Form } from '@unform/web'
import { Scope } from '@unform/core'
import { useDispatch, useSelector } from 'react-redux'
import GooglePlacesAutocomplete, { geocodeByPlaceId } from 'react-google-places-autocomplete';
import { Input, SelectInput } from '../../../reusable'
import { fetchFindUser, fetchUpdateUser } from '../../../store/users'
import * as Yup from 'yup'
import { fetchAllSystemModules } from '../../../store/system_modules'
import { useRouteMatch } from 'react-router-dom'
import { toast } from 'react-toastify'
import { push } from 'connected-react-router'

const roles = [
  {
    value: 'customer',
    label: 'Cliente',
  },
  {
    value: 'admin',
    label: 'Administrador',
  },
  {
    value: 'business',
    label: 'Empresa',
  },
  {
    value: 'collector',
    label: 'Coletor',
  },
]

const User = () => {
  const { user, loading } = useSelector(state => state.users)
  const { system_modules } = useSelector(state => state.system_modules)
  const { params } = useRouteMatch()

  const [user_form, setUserForm] = useState(null)
  const formRef = useRef(null)
  const dispatch = useDispatch()
  const [value, setValue] = useState(null)

  useEffect(() => {
    if (params && params.id) {
      dispatch(fetchFindUser(params.id))
    }
  }, [params, dispatch])

  useEffect(() => {
    if (user) {
      setUserForm(user)
    }
  }, [user])


  useEffect(() => {

    if (user_form) {
      const getRole = () => roles.filter(role => role.value === user_form.role);
      const getModules = () => user_form?.user_modules?.map(({ id, name }) => ({ label: name, value: id }))
      formRef.current.setData({
        id: user_form?.id,
        role: getRole()[0],
        system_module_users_attributes: getModules(),
        profile_attributes: {
          id: user_form?.profile?.id,
          user_id: user_form?.id,
          name: user_form?.profile?.name,
          email: user_form?.profile?.email,
          phone: user_form?.profile?.phone,
          document: user_form?.profile?.document,
          address_attributes: {
            id: user_form?.profile?.address?.id,
            profile_id: user_form?.profile?.id,
            street: user_form?.profile?.address?.street,
            number: user_form?.profile?.address?.number,
            neighborhood: user_form?.profile?.address?.neighborhood,
            city: user_form?.profile?.address?.city,
            state: user_form?.profile?.address?.state,
            country: user_form?.profile?.address?.country,
            zip_code: user_form?.profile?.address?.zip_code
          }
        }
      });
    }

  }, [user_form])

  const treatSystemModuleUsers = (data) => {
    let user_modules = user_form.system_module_users.map(module => ({ id: module.id, user_id: module.user_id, system_module_id: module.system_module_id, _destroy: '1' }));
    let modules = data.system_module_users_attributes.map(sm => ({ user_id: user_form.id, system_module_id: sm }))

    if (user_modules.length < 0) {
      return modules
    } else if (modules === null || modules.length === 0) {
      return user_modules
    } else {
      let modules_includes = modules.map(m => m.system_module_id)
      let user_modules_includes = user_modules.map(m => m.system_module_id)

      let rejected = user_modules.filter(m => !modules_includes.includes(m.system_module_id))
      let included = modules.filter(m => !user_modules_includes.includes(m.system_module_id))

      return [...rejected, ...included]
    }
  }

  const handleSubmit = async (data) => {
    try {
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        id: Yup.string().required('ID usuário Obrigatório'),
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

      const user_data = data
      user_data.system_module_users_attributes = treatSystemModuleUsers(data)

      await dispatch(fetchUpdateUser(user_data))
        .unwrap()
        .then(() => {
          toast.success('Usuário atualizado com sucesso');
          dispatch(push('/users'))
        })
        .catch(() => {
          toast.error('Erro ao atualizar usuário')
        });

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

  useEffect(() => {
    dispatch(fetchAllSystemModules())
  }, [dispatch]);

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
        <CCard>
          <CCardHeader>
            Perfil - Informações do Usuário

          </CCardHeader>
          <CCardBody>
            <Form ref={formRef} onSubmit={handleSubmit}>
              <CInputGroup>
                <Input id="id" name="id" hidden />
              </CInputGroup>
              <CFormGroup>
                <CLabel htmlFor="role">Tipo de usuário</CLabel>
                <SelectInput id="role" name="role" options={roles} />
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="role">Módulos de acesso</CLabel>
                <SelectInput
                  id="system_module_users_attributes"
                  name="system_module_users_attributes"
                  isMulti={true}
                  options={system_modules.map(({ id, name }) => ({ label: name, value: id }))}
                />
              </CFormGroup>
              <Scope path="profile_attributes">
                <CInputGroup>
                  <Input id="id" name="id" hidden />
                </CInputGroup>
                <CInputGroup>
                  <Input id="user_id" name="user_id" hidden />
                </CInputGroup>
                <CInputGroup className="mt-3">
                  <CInputGroupPrepend>
                    <CInputGroupText>Nome</CInputGroupText>
                  </CInputGroupPrepend>
                  <Input id="name" name="name" placeholder="Nome" />
                </CInputGroup>
                <CInputGroup className="mt-3">
                  <CInputGroupPrepend>
                    <CInputGroupText>Telefone</CInputGroupText>
                  </CInputGroupPrepend>
                  <Input id="phone" name="phone" placeholder="Telefone" />
                </CInputGroup>
                <CInputGroup className="mt-3">
                  <CInputGroupPrepend>
                    <CInputGroupText>Email</CInputGroupText>
                  </CInputGroupPrepend>
                  <Input id="email" name="email" placeholder="Email" />
                </CInputGroup>
                <CInputGroup className="mt-3">
                  <CInputGroupPrepend>
                    <CInputGroupText>CPF/CNPJ</CInputGroupText>
                  </CInputGroupPrepend>
                  <Input id="document" name="document" placeholder="Documento" />
                </CInputGroup>
                <Scope path="address_attributes">
                  <CCard className="mt-3">
                    <CCardHeader>Endereço</CCardHeader>
                    <CCardBody>
                      <CInputGroup>
                        <Input id="address-id" name="id" hidden />
                      </CInputGroup>
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
                      <CInputGroup>
                        <Input id="profile_id" name="profile_id" hidden />
                      </CInputGroup>
                      <CInputGroup className="mt-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>Número</CInputGroupText>
                        </CInputGroupPrepend>
                        <Input id="number" name="number" placeholder="Número" />
                      </CInputGroup>
                      <CInputGroup className="mt-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>Rua</CInputGroupText>
                        </CInputGroupPrepend>
                        <Input id="street" name="street" placeholder="Rua" />
                      </CInputGroup>
                      <CInputGroup className="mt-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>Bairro</CInputGroupText>
                        </CInputGroupPrepend>
                        <Input id="neighborhood" name="neighborhood" placeholder="Bairro" />
                      </CInputGroup>
                      <CInputGroup className="mt-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>Cidade</CInputGroupText>
                        </CInputGroupPrepend>
                        <Input id="city" name="city" placeholder="Cidade" />
                      </CInputGroup>
                      <CInputGroup className="mt-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>Estado</CInputGroupText>
                        </CInputGroupPrepend>
                        <Input id="state" name="state" placeholder="Estado" />
                      </CInputGroup>
                      <CInputGroup className="mt-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>Pais</CInputGroupText>
                        </CInputGroupPrepend>
                        <Input id="country" name="country" placeholder="Pais" />
                      </CInputGroup>
                      <CInputGroup className="mt-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>CEP</CInputGroupText>
                        </CInputGroupPrepend>
                        <Input id="zip_code" name="zip_code" placeholder="CEP" />
                      </CInputGroup>
                      <Input type="text" name="latitude" hidden />
                      <Input type="text" name="longitude" hidden />
                    </CCardBody>
                  </CCard>
                </Scope>
              </Scope>
              <CFormGroup>
                <CButton disabled={loading} type="submit" color="success" className="mt-2">Salvar</CButton>
              </CFormGroup>
              <CInputGroup className="mt-3">
                <CLink className="text-danger" to="/users">Voltar</CLink>
              </CInputGroup>
            </Form>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default User
