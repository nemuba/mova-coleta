import CIcon from '@coreui/icons-react';
import { CButton, CCard, CCardBody, CCardHeader, CCol, CContainer, CFormGroup, CInputGroup, CInputGroupAppend, CInputGroupPrepend, CInputGroupText, CLabel, CRow } from '@coreui/react';
import { Form } from '@unform/web';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router';
import { Input, SelectInput } from 'src/reusable';
import { listUsers } from '../../../store/fetch_actions/users';
import { getRoute, updateRoute } from '../../../store/fetch_actions/routes';
import { useRef } from 'react';
import * as Yup from 'yup'

const RouteDetail = () => {
  const { route } = useSelector(state => state.routes);
  const { users } = useSelector(state => state.users)
  const [collectors, setCollectors] = useState([])
  const { params } = useRouteMatch()
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

  useEffect(() => {
    if (params && params.id) {
      dispatch(getRoute(params.id))
    }
  }, [params, dispatch])

  useEffect(() => {
    if (route) {
      formRef.current.setData({
        id: route.id,
        date_collect: route.date_collect,
        date_start: route.date_start,
        date_finish: route.date_finish,
        user_id: { label: route?.user?.email, value: route.user_id },
      })
    }
  }, [route])

  const handleSubmit = async (data) => {
    try {
      const schema = Yup.object().shape({
        date_collect: Yup.string().required('Date da coleta é obrigatória'),
        user_id: Yup.string().required('Selecione um Coletor'),
      });

      await schema.validate(data, { abortEarly: false })

      console.log(data)
      dispatch(updateRoute(data))
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
              <h2 className="m-3">Detalhes da Rota</h2>
            </CCardHeader>
            <CCardBody>
              <Form ref={formRef} onSubmit={handleSubmit}>
                <Input id="id" name="id" hidden />
                <CFormGroup>
                  <CLabel>Data da Coleta</CLabel>
                  <CInputGroup>
                    <CInputGroupPrepend>
                      <CInputGroupText><CIcon name="cil-calendar" /></CInputGroupText>
                    </CInputGroupPrepend>
                    <Input type="text" id="date_collect" name="date_collect" placeholder="Data da Coleta" />
                    <CInputGroupAppend>
                      <CInputGroupText><CIcon name="cil-truck" /></CInputGroupText>
                    </CInputGroupAppend>
                  </CInputGroup>
                </CFormGroup>
                <CFormGroup>
                  <CLabel>Data de Inicio</CLabel>
                  <CInputGroup>
                    <CInputGroupPrepend>
                      <CInputGroupText><CIcon name="cil-calendar" /></CInputGroupText>
                    </CInputGroupPrepend>
                    <Input type="text" id="date_start" name="date_start" placeholder="Data de Inicio" />
                    <CInputGroupAppend>
                      <CInputGroupText><CIcon name="cil-location-pin" /></CInputGroupText>
                    </CInputGroupAppend>
                  </CInputGroup>
                </CFormGroup>
                <CFormGroup>
                  <CLabel>Data Final</CLabel>
                  <CInputGroup>
                    <CInputGroupPrepend>
                      <CInputGroupText><CIcon name="cil-calendar" /></CInputGroupText>
                    </CInputGroupPrepend>
                    <Input type="text" id="date_finish" name="date_finish" placeholder="Data Fim" />
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
                  <CButton color="success" type="submit">Atualizar</CButton>
                </CFormGroup>
              </Form>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
}

export default RouteDetail;
