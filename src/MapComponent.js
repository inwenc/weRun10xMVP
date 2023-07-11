import React from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";

const MapComponent = ({ coordinates }) => {
    const customMarker = new L.icon({
      iconUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png",
      iconSize: [25, 41],
      iconAnchor: [13, 0],
    });
  return (
    <MapContainer style={{ height: "100vh" }} center={coordinates} zoom={13}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={coordinates} icon={customMarker}>
        <Popup>
          A pretty CSS3 popup.
          <br />
          Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
