import { setLocation } from '../../location'

export const getLocation = () => {
  return dispatch => {
    navigator.geolocation.getCurrentPosition(function (position) {
      dispatch(setLocation([position.coords.latitude, position.coords.longitude]));
    });
  }
}
