import { CBadge, CCard, CCardBody, CCardHeader, CContainer } from '@coreui/react';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { Marker, Popup } from 'react-leaflet';
import Map from 'src/reusable/Map';
import { fetchFindCollect } from 'src/store/collects';
import { setLocation } from 'src/store/map';
import L from 'leaflet'
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
import { getBadge } from 'src/services/functions';

const markerIcon = L.icon({
  iconUrl: icon,
  iconShadow: iconShadow
})

const CollectDetail = () => {
  const { params } = useRouteMatch()
  const { collect } = useSelector(state => state.collects)
  const map = useSelector(state => state.map)
  const [address, setAddress] = useState(null)

  const dispatch = useDispatch();

  useEffect(() => {
    if (params && params.id) dispatch(fetchFindCollect(params.id))
  }, [dispatch, params]);

  useEffect(() => {
    if (collect && collect?.user && collect?.user?.profile && collect?.user?.profile?.address) {
      const { user } = collect
      const { profile } = user
      const { address } = profile

      setAddress(address)
      dispatch(setLocation([Number(address?.latitude), Number(address?.longitude)]))
    }
  }, [collect, dispatch]);

  if (map === null || map.length === 0 || map.includes(null)) {
    return (
      <div className="container">
        <div className="sk-spinner sk-spinner-pulse"></div>
      </div>
    )
  }

  return (
    <CContainer>
      <CCard>
        <CCardHeader>
          <h3>Detalhes da solicitação</h3>
        </CCardHeader>
        <CCardBody>
          <p>Solicitante: {collect?.user?.email}</p>
          <p>Data da solicitação: {collect?.created_at}</p>
          <p>Observação: {collect?.note}</p>
          <p>Status: <CBadge color={getBadge(collect?.collect_status?.name)}>{collect?.collect_status?.name}</CBadge></p>
          <Map center={map} scrollZoom={true}>
            <Marker position={map} icon={markerIcon} eventHandlers={{
              click: () => setAddress(address)
            }} />
            {
              address && (
                <Popup
                  position={[address.latitude, address.longitude]}
                  closeOnClick={false}
                  closeButton={false}
                >
                  <CContainer>
                    <span>Rua: {address.street}</span><br />
                    <span>Número: {address.number}</span><br />
                    <span>Bairro: {address.neighborhood}</span><br />
                    <span>Cidade: {address.city}</span><br />
                    <span>Estado: {address.state}</span><br />
                    <span>CEP: {address.zip_code}</span><br />
                  </CContainer>
                </Popup>
              )
            }
          </Map>
        </CCardBody>
      </CCard>
    </CContainer>
  );
}

export default CollectDetail;
