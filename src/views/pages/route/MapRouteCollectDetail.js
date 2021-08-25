import React from 'react';
import { Marker, Map, TileLayer, Tooltip } from 'react-leaflet';
import { CContainer } from '@coreui/react';
import { MarkerIcon, MarkerIconSelected } from '../../../reusable'

const MapRouteCollectDetail = ({ location, collects, zoom }) => {

  const mountAddress = (address) => {
    return (
      <h6>
        {address.street}, {address.number} - {address.neighborhood} - {address.city} - {address.state} -  {address.zip_code}
      </h6>
    )
  }


  if (location.length === 0 || collects.length === 0) {
    return (
      <CContainer>
        <h5 className="text-danger">Não há coletas cadastradas</h5>
      </CContainer>
    )
  }


  return (
    <>
      <Map center={location} scrollZoom={true} zoom={zoom}>
        <TileLayer
          attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
          url="https://api.maptiler.com/maps/basic/{z}/{x}/{y}.png?key=iqXGooNmwymshTbYR2fK"
        />
        {collects.map(item => {
          return (
            <div key={item.id}>
              <Marker
                position={[item.address.latitude, item.address.longitude]}
                icon={item.selected ? MarkerIconSelected : MarkerIcon}
                opacity={item.selected ? 0.8 : 1.0}
              >
                <Tooltip direction="bottom" offset={[0, 20]} opacity={1} permanent>
                  <h6 className='text-center text-danger'>Ordem: {item.order}</h6>
                  {mountAddress(item.address)}
                </Tooltip>
              </Marker>
            </div>
          )
        })
        }
      </Map>
    </>
  )
}

export default MapRouteCollectDetail;


