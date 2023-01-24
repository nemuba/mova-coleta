import { CButton, CCard, CCardBody, CCardHeader, CCol, CContainer, CDataTable, CFormGroup, CInputGroup, CInputGroupPrepend, CInputGroupText, CLabel, CRow } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { Form } from '@unform/web';
import { push } from 'connected-react-router';
import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { Input, SelectInput } from '../../../reusable';
import { fetchAllCollects } from '../../../store/collects';
import { getLocation } from '../../../store/fetch_actions/location';
import { fetchCreateRoute } from '../../../store/routes';
import { fetchAllUsers } from '../../../store/users';
import MapRouteCollect from './MapRouteCollect';
import ModalRemoveRouteCollect from './ModalRemoveRouteCollect';

const NewRoute = () => {
  const { loading } = useSelector(state => state.routes);
  const { users } = useSelector(state => state.users)
  const { location } = useSelector(state => state.location)
  const { collects } = useSelector(state => state.collects)
  const { collect_ids } = useSelector(state => state.route_collect)
  const [collectors, setCollectors] = useState([])
  const [mapCollects, setMapCollects] = useState([])
  const [collectSelected, setCollectSelected] = useState([])
  const dispatch = useDispatch(null)
  const formRef = useRef(null)
  const fields = [
    { key: 'address', label: 'Endereço' },
    { key: 'order', label: 'Ordem' },
    { key: 'options', label: 'Opções' }
  ]

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
    if (collects.length > 0) {
      const collectUnselected = collects.filter(collect => collect?.collect_status?.name !== "Aguardando Coleta")
      const mapCollects = collectUnselected.map(collect => ({
        id: collect.id,
        address: collect?.user?.profile?.address,
        selected: false,
      }))
      setMapCollects(mapCollects)
    }
  }, [collects])

  useEffect(() => {
    if (mapCollects.length > 0 && collect_ids.length > 0) {
      let data = mapCollects.map(collect => ({
        id: collect.id,
        address: collect.address,
        selected: collect_ids.map(c => (Number(c.collect_id))).includes(collect.id)
      }))

      let collectSelected = data.filter(collect => collect.selected)
      collectSelected = collectSelected.map(selected => {
        const order = collect_ids.find(c => Number(c.collect_id) === selected.id)
        return {
          id: selected.id,
          address: selected.address,
          order: order?.order
        }
      })
      setCollectSelected(collectSelected)
      setMapCollects(data)
    }

    if (collect_ids.length === 0) {
      let data = mapCollects.map(collect => ({
        id: collect.id,
        address: collect.address,
        selected: collect_ids.map(c => (Number(c.collect_id))).includes(collect.id)
      }))
      setCollectSelected([])
      setMapCollects(data)
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collect_ids.length, mapCollects.length])



  const handleSubmit = async (data) => {
    try {
      const schema = Yup.object().shape({
        request_date: Yup.date().notRequired('Data da solicitação é obrigatória'),
        user_id: Yup.string().required('Selecione um Coletor'),
      });

      await schema.validate(data, { abortEarly: false })

      const route_collects_attributes = collectSelected.map(collect => ({ collect_id: collect.id, order: collect.order }))

      const route = {
        ...data,
        route_collects_attributes
      }
      await dispatch(fetchCreateRoute(route))
        .unwrap()
        .then(() => {
          toast.success('Rota criada com sucesso!')
          dispatch(push('/routes'))
        })
        .catch(() => {
          toast.error('Erro ao criar rota!')
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
              <h3>Criar Rota</h3>
            </CCardHeader>
            <CCardBody>
              <Form ref={formRef} onSubmit={handleSubmit}>
                <CFormGroup row>
                  <CCol lg="4" md="4" sm="12" className="pt-2">
                    <CLabel>Data da Solicitação</CLabel>
                    <CInputGroup>
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-calendar" />
                        </CInputGroupText>
                      </CInputGroupPrepend>

                      <Input
                        readOnly
                        type="date"
                        id="request_date"
                        name="request_date"
                        placeholder="Data da Solicitação"
                        value={new moment().format('YYYY-MM-DD')}
                      />
                    </CInputGroup>
                  </CCol>
                  <CCol lg="4" md="4" sm="12" className="pt-2">
                    <CLabel>Selecione um Coletor</CLabel>
                    <SelectInput id="user_id" name="user_id" placeholder="Coletor" options={collectors} />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol lg="6" md="6" sm="12" className="pt-2">
                    <CLabel>Selecione as solicitações de coleta para adicionar na rota</CLabel>
                    <MapRouteCollect location={location} collects={mapCollects} />
                  </CCol>
                  <CCol lg="6" md="6" sm="12" className="pt-2">
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
                              {item.address.street}, {item.address.number} - {item.address.city} - {item.address.state}
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
                  <CButton
                    color="primary"
                    type="submit"
                    disabled={mapCollects.length === 0 || loading}
                  >Cadastrar</CButton>
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
