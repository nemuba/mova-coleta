import React, { useRef } from 'react';
import { Marker, Popup } from 'react-leaflet';
import { Input, Map } from '../../../reusable';
import { CButton, CContainer, CFormGroup, CLabel } from '@coreui/react';
import { Form } from '@unform/web';
import { useDispatch } from 'react-redux';
import { addCollect } from '../../../store/route_collect';
import { MarkerIcon, MarkerIconSelected } from '../../../reusable'


const MapRouteCollect = ({ location, collects }) => {

  const formRef = useRef(null);
  const dispatch = useDispatch();


  const mountAddress = (address) => {
    return (
      <span>
        {address.street}, {address.number} - {address.neighborhood} - {address.city} - {address.state} -  {address.zip_code}
      </span>
    )
  }

  const handleSubmit = (data, { reset }) => {
    dispatch(addCollect(data))
    reset()
  }

  if (location.length === 0 || collects.length === 0) {
    return (
      <div className="container">
        <div className="sk-spinner sk-spinner-pulse"></div>
      </div>
    )
  }


  return (
    <>
      <Map center={location} scrollZoom={true}>
        {collects.map(item => {
          return (
            <div key={item.id}>
              <Marker
                position={[item.address.latitude, item.address.longitude]}
                icon={item.selected ? MarkerIconSelected : MarkerIcon}
                opacity={item.selected ? 0.5 : 1.0}

              >
                <Popup>
                  <CContainer>
                    {mountAddress(item.address)}
                    <br />
                    <Form onSubmit={handleSubmit} ref={formRef}>
                      <Input name="collect_id" id="collect_id" defaultValue={item.id} hidden />
                      <CFormGroup>
                        <CLabel>Ordem</CLabel>
                        <Input id="order" name="order" type='number' placeholder="ordem" />
                      </CFormGroup>
                      <CButton
                        type="submit"
                        color='primary'
                        size="sm"
                      >Adicionar</CButton>
                    </Form>
                  </CContainer>
                </Popup>
              </Marker>
            </div>
          )
        })
        }
      </Map>
    </>
  )
}

export default MapRouteCollect;


