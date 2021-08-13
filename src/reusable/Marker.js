import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { useDispatch } from 'react-redux';
import { setLocation } from '../store/map'
import { setLocationFetch } from '../store/fetch_actions/location';

const markerIcon = L.icon({
  iconUrl: icon,
  iconShadow: iconShadow
});

export default function DraggableMarker({ center }) {
  const dispatch = useDispatch()
  const [draggable, setDraggable] = useState(false)
  const [position, setPosition] = useState(center)
  const markerRef = useRef(null)

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker != null) {
          setPosition(marker.getLatLng())
        }
        if (position && typeof Object) {
          dispatch(setLocation([position.lat, position.lng]))
        }
      },
    }),
    [dispatch, position],
  )
  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d)
  }, [])

  useEffect(() => {
    if (position && typeof Object)
      dispatch(setLocationFetch({ lat: position.lat, lng: position.lng }))
  }, [dispatch, position])

  return (
    <Marker
      icon={markerIcon}
      draggable={draggable}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}>
      <Popup minWidth={90}>
        <span onClick={toggleDraggable}>
          {draggable
            ? 'Selecione o local'
            : 'Clique aqui para para selecionar o local'}
        </span>
      </Popup>
    </Marker>
  )
}
