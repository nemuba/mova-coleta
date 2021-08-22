import L from 'leaflet'
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png'

const MarkerIcon = L.icon({
  iconUrl: icon,
  iconShadow: iconShadow
})

export default MarkerIcon
