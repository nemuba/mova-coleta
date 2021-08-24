import React, { Component } from "react";
import { Map, TileLayer } from "react-leaflet";
import Routing from "./Routing";

class MapComponent extends Component {
  constructor() {
    super();
    this.state = {
      lat: 17.4,
      lng: 78.4,
      zoom: 7,
      isMapInit: false
    };
  }

  saveMap = map => {
    this.map = map;
    this.setState({
      isMapInit: true
    });
  };

  render() {
    const { lat, lng, zoom } = this.state;
    const position = [lat, lng];

    return (
      <Map center={position} zoom={zoom} ref={this.saveMap}>
        <TileLayer
          attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
          url="https://api.maptiler.com/maps/basic/{z}/{x}/{y}.png?key=iqXGooNmwymshTbYR2fK"
        />
        {this.state.isMapInit && <Routing map={this.map} />}
      </Map>
    );
  }
}

export default MapComponent;
