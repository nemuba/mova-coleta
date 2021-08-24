import React from 'react'
import { Map, TileLayer } from 'react-leaflet'

const MyMap = ({ children, center, scrollZoom = false, zoom =13 }) => {
  return (
    <Map center={center} zoom={zoom} scrollWheelZoom={scrollZoom}>
      <TileLayer
        attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
        url="https://api.maptiler.com/maps/basic/{z}/{x}/{y}.png?key=iqXGooNmwymshTbYR2fK"
      />
      {children}
    </Map>
  )
}

export default MyMap
