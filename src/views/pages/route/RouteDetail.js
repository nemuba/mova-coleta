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
import { listCollects } from '../../../store/fetch_actions/collects';
import { getLocation } from '../../../store/fetch_actions/location';
import MapRouteCollectDetail from './MapRouteCollectDetail';


const RouteDetail = () => {
  const { route } = useSelector(state => state.routes);
  const { users } = useSelector(state => state.users)
  const { collects } = useSelector(state => state.collects)
  const { location } = useSelector(state => state.location)
  const [collectors, setCollectors] = useState([])
  const [mapCollects, setMapCollects] = useState([])
  const { params } = useRouteMatch()
  const dispatch = useDispatch(null)
  const formRef = useRef(null)

  useEffect(() => {
    dispatch(listUsers())
    dispatch(listCollects())
    dispatch(getLocation())
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
    if (route !== null) {
      const collector = users.find(c => c.id === route.user_id)
      formRef.current.setData({
        id: route.id,
        request_date: route.request_date,
        collect_date: route.collect_date,
        user_id: { label: collector?.profile?.name, value: route?.user_id },
      })

    }
  }, [route, users])

  useEffect(() => {
    if (route && collects.length > 0) {
      const mapCollects = route?.route_collects?.map(rc => {
        const collect = collects?.find(collect => collect.id === rc.collect_id)
        return {
          id: rc.collect_id,
          address: collect?.user?.profile?.address,
          order: rc.order,
          selected: true
        }
      })
      setMapCollects(mapCollects)
    }
  }, [route, collects])

  const handleSubmit = async (data) => {
    try {
      const schema = Yup.object().shape({
        request_date: Yup.string().required('Date da coleta é obrigatória'),
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
                <CFormGroup row>
                  <CCol lg="4" md="4" sm="12" className="pt-2">
                    <CLabel>Data da Solicitação</CLabel>
                    <CInputGroup>
                      <CInputGroupPrepend>
                        <CInputGroupText><CIcon name="cil-calendar" /></CInputGroupText>
                      </CInputGroupPrepend>
                      <Input type="date" id="request_date" name="request_date" placeholder="Data da Solicitação" />
                      <CInputGroupAppend>
                        <CInputGroupText><CIcon name="cil-truck" /></CInputGroupText>
                      </CInputGroupAppend>
                    </CInputGroup>
                  </CCol>
                  <CCol lg="4" md="4" sm="12" className="pt-2">
                    <CLabel>Data da Coleta</CLabel>
                    <CInputGroup>
                      <CInputGroupPrepend>
                        <CInputGroupText><CIcon name="cil-calendar" /></CInputGroupText>
                      </CInputGroupPrepend>
                      <Input type="date" id="collect_date" name="collect_date" placeholder="Data da Coleta" />
                      <CInputGroupAppend>
                        <CInputGroupText><CIcon name="cil-location-pin" /></CInputGroupText>
                      </CInputGroupAppend>
                    </CInputGroup>
                  </CCol>
                  <CCol lg="4" md="4" sm="12" className="pt-2">
                    <CLabel>Selecione um Coletor</CLabel>
                    <SelectInput id="user_id" name="user_id" placeholder="Coletor" options={collectors} />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol className="pt-2">
                    <CLabel>Lista de Coletas</CLabel>
                    {mapCollects && <MapRouteCollectDetail zoom={10} location={location} collects={mapCollects} />}
                  </CCol>
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
