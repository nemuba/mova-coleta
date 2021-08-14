import CIcon from '@coreui/icons-react';
import { CButton, CCard, CCardBody, CCardHeader, CCol, CContainer, CFormGroup, CInputGroup, CInputGroupAppend, CInputGroupPrepend, CInputGroupText, CLabel, CRow } from '@coreui/react';
import { Form } from '@unform/web';
import React, { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, SelectInput } from '../../../reusable';
import { listUsers } from '../../../store/fetch_actions/users';
import * as Yup from 'yup';
import { createRoute } from 'src/store/fetch_actions/routes';

const NewRoute = () => {
  const { users } = useSelector(state => state.users)
  const [collectors, setCollectors] = useState([])
  const dispatch = useDispatch(null)
  const formRef = useRef(null)

  useEffect(() => {
    dispatch(listUsers())
  }, [dispatch])

  useEffect(() => {
    if (users) {
      const collectors = users.filter(user => user.role === 'collector')
      const options = collectors.map(user => ({ label: user.profile.name, value: user.id }))
      setCollectors(options)
    }
  }, [users])

  const handleSubmit = async (data) => {
    try {
      const schema = Yup.object().shape({
        date_collect: Yup.date().notRequired('Date da coleta é obrigatória'),
        user_id: Yup.string().required('Selecione um Coletor'),
      });

      await schema.validate(data, { abortEarly: false })

      console.log(data)
      dispatch(createRoute(data))
    } catch (error) {
      const validationErrors = {};

      if (error instanceof Yup.ValidationError) {
        error.inner.forEach(error => {
          validationErrors[error.path] = error.message;
        });
        formRef.current.setErrors(validationErrors);
      }
    }
  }

  return (
    <CContainer>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              <h3>Criar Rota</h3>
            </CCardHeader>
            <CCardBody>
              <Form ref={formRef} onSubmit={handleSubmit}>
                <CFormGroup>
                  <CInputGroup>
                    <CInputGroupPrepend>
                      <CInputGroupText><CIcon name="cil-calendar" /></CInputGroupText>
                    </CInputGroupPrepend>
                    <Input type="date" id="date_collect" name="date_collect" placeholder="Data da Coleta" />
                    <CInputGroupAppend>
                      <CInputGroupText><CIcon name="cil-truck" /></CInputGroupText>
                    </CInputGroupAppend>
                  </CInputGroup>
                </CFormGroup>
                <CFormGroup>
                  <CInputGroup>
                    <CInputGroupPrepend>
                      <CInputGroupText><CIcon name="cil-calendar" /></CInputGroupText>
                    </CInputGroupPrepend>
                    <Input type="date" id="date_start" name="date_start" placeholder="Data de Inicio" />
                    <CInputGroupAppend>
                      <CInputGroupText><CIcon name="cil-location-pin" /></CInputGroupText>
                    </CInputGroupAppend>
                  </CInputGroup>
                </CFormGroup>
                <CFormGroup>
                  <CInputGroup>
                    <CInputGroupPrepend>
                      <CInputGroupText><CIcon name="cil-calendar" /></CInputGroupText>
                    </CInputGroupPrepend>
                    <Input type="date" id="date_end" name="date_end" placeholder="Data Fim" />
                    <CInputGroupAppend>
                      <CInputGroupText><CIcon name="cil-location-pin" /></CInputGroupText>
                    </CInputGroupAppend>
                  </CInputGroup>
                </CFormGroup>
                <CFormGroup>
                  <CLabel>Selecione um Coletor</CLabel>
                  <SelectInput id="user_id" name="user_id" placeholder="Coletor" options={collectors} />
                </CFormGroup>
                <CFormGroup>
                  <CButton color="primary" type="submit">Cadastrar</CButton>
                </CFormGroup>
              </Form>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default NewRoute;
