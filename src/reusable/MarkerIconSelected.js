import L from 'leaflet'
import icon from '../assets/images/marker-checked.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png'

const MarkerIconSelected = L.icon({
  iconUrl: icon,
  iconShadow: iconShadow
})

export default MarkerIconSelected
