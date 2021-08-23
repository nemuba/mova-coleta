import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { Map } from '../../../reusable';
import { CButton, CContainer, CFormGroup, CLabel } from '@coreui/react';
import { useDispatch } from 'react-redux';
import { addCollect } from '../../../store/route_collect';
import { MarkerIcon, MarkerIconSelected } from '../../../reusable'


const MapRouteCollect = ({ location, collects, zoom }) => {
  const dispatch = useDispatch();

  const mountAddress = (address) => {
    return (
      <span>
        {address.street}, {address.number} - {address.neighborhood} - {address.city} - {address.state} -  {address.zip_code}
      </span>
    )
  }

  const handleSubmit = (item) => {
    const order = document.getElementById(`order-${item.id}`).value
    dispatch(addCollect({ collect_id: item.id, order: order }))
  }

  if (location.length === 0 || collects.length === 0) {
    return (
      <CContainer>
        <h4 className="text-danger">Não há coletas cadastradas</h4>
      </CContainer>
    )
  }


  return (
    <>
      <Map center={location} scrollZoom={true} zoom={zoom}>
        {collects.map(item => {
          return (
            <div key={item.id}>
              <Marker
                position={[item.address.latitude, item.address.longitude]}
                icon={item.selected ? MarkerIconSelected : MarkerIcon}
                opacity={item.selected ? 0.8 : 1.0}

              >
                <Popup>
                  <CContainer>
                    {mountAddress(item.address)}
                    <br />
                    <form>
                      <CFormGroup>
                        <CLabel>Ordem</CLabel>
                        <input id={`order-${item.id}`} className="form-control" name="order" type='number' placeholder="ordem" />
                      </CFormGroup>
                      <CButton
                        color='primary'
                        size="sm"
                        onClick={() => handleSubmit(item)}
                      >Adicionar</CButton>
                    </form>
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


