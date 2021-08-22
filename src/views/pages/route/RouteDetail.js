import CIcon from '@coreui/icons-react';
import { CButton, CCard, CCardBody, CCardHeader, CCol, CContainer, CDataTable, CFormGroup, CInputGroup, CInputGroupAppend, CInputGroupPrepend, CInputGroupText, CLabel, CRow } from '@coreui/react';
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
import { getLocation } from '../../../store/map';
import ModalRemoveRouteCollect from './ModalRemoveRouteCollect';


const RouteDetail = () => {
  const { route } = useSelector(state => state.routes);
  const { users } = useSelector(state => state.users)
  const { collects } = useSelector(state => state.collects)
  const [collectSelected, setCollectSelected] = useState([])
  const [mapCollects, setMapCollects] = useState([])
  const [collectors, setCollectors] = useState([])
  const { params } = useRouteMatch()
  const dispatch = useDispatch(null)
  const formRef = useRef(null)
  const fields = [
    { key: 'address', label: 'Endereço' },
    { key: 'order', label: 'Ordem' },
    { key: 'options', label: 'Opções' }
  ]

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
      formRef.current.setData({
        id: route.id,
        request_date: route.request_date,
        collect_date: route.collect_date,
        user_id: { label: route?.user?.email, value: route?.user_id },
      })
      const collectSelected = route?.route_collects.map(collect => {
        const selected = mapCollects.find(item => Number(item.id) === Number(collect.collect_id))
        return {
          ...selected,
          order: collect.order,
        }
      })

      setCollectSelected(collectSelected)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route, mapCollects.length])

  useEffect(() => {
    if (route !== null && collects.length > 0) {

      const data = collects.map(collect => {
        const selected = route?.route_collects.find(item => Number(item.collect_id) === Number(collect.id))
        return {
          id: collect.id,
          address: collect?.user?.profile?.address,
          selected: selected ? true : false,
        }
      })
      setMapCollects(data)
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

                  <CCol lg="12" md="12" sm="12" className="pt-2">
                    <CLabel>Lista de solicitações selecionadas</CLabel>
                    <CDataTable
                      items={collectSelected}
                      fields={fields}
                      sortable
                      noItemsViewSlot={'Nenhuma Solicitação selecionada '}
                      scopedSlots={{
                        'address': (item) => {
                          return (
                            <td>
                              {item?.address?.street},
                              {item?.address?.number} -
                              {item?.address?.city} -
                              {item?.address?.state}
                            </td>
                          )
                        },
                        'options': (item) => {
                          return (
                            <td>
                              <ModalRemoveRouteCollect collect={item} title={'Remover Coleta'} />
                            </td>
                          )
                        }

                      }}
                    />
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
