import CIcon from '@coreui/icons-react';
import { CButton, CCard, CCardBody, CCardHeader, CCol, CContainer, CFormGroup, CInputGroup, CInputGroupPrepend, CInputGroupText, CLabel, CRow } from '@coreui/react';
import { Form } from '@unform/web';
import { push } from 'connected-react-router';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router';
import { toast } from 'react-toastify';
import { Input, SelectInput } from 'src/reusable';
import * as Yup from 'yup';
import { fetchAllCollects } from '../../../store/collects';
import { getLocation } from '../../../store/fetch_actions/location';
import { fetchFindRoute, fetchUpdateRoute } from '../../../store/routes';
import { fetchAllUsers } from '../../../store/users';
import MapRouteCollectDetail from './MapRouteCollectDetail';


const RouteDetail = () => {
  const { route, loading } = useSelector(state => state.routes);
  const { users } = useSelector(state => state.users)
  const { collects } = useSelector(state => state.collects)
  const { location } = useSelector(state => state.location)
  const [collectors, setCollectors] = useState([])
  const [mapCollects, setMapCollects] = useState([])
  const { params } = useRouteMatch()
  const dispatch = useDispatch(null)
  const formRef = useRef(null)

  useEffect(() => {
    dispatch(fetchAllUsers())
    dispatch(fetchAllCollects())
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
      dispatch(fetchFindRoute(params.id))
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

      await dispatch(fetchUpdateRoute(data))
        .unwrap()
        .then(() => {
          toast.success('Rota atualizada com sucesso!')
          dispatch(push('/routes'))
        })
        .catch(() => {
          toast.error('Erro ao atualizar rota!')
        })
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
                      <Input readOnly type="date" id="request_date" name="request_date" placeholder="Data da Solicitação" />
                    </CInputGroup>
                  </CCol>
                  <CCol lg="4" md="4" sm="12" className="pt-2">
                    <CLabel>Data da Coleta</CLabel>
                    <CInputGroup>
                      <CInputGroupPrepend>
                        <CInputGroupText><CIcon name="cil-calendar" /></CInputGroupText>
                      </CInputGroupPrepend>
                      <Input readOnly type="date" id="collect_date" name="collect_date" placeholder="Data da Coleta" />
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
                  <CButton disabled={loading} color="success" type="submit">Atualizar</CButton>
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
