import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = ({ coordinates, trackPoints }) => {
  const customMarker = new L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [13, 0],
  });
 const [currentTrackPoints, setTrackpoints] = useState(null);

 useEffect(() => 
 {
    if (trackPoints !== undefined) {
        setTrackpoints(trackPoints)
    } else {
      return;
    } 
 },[trackPoints])

  return (
    <MapContainer style={{ height: "100vh" }} center={coordinates} zoom={13}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {trackPoints && (
        <Polyline
          positions={trackPoints}
          fillColor="red"
          color="blue"
          weight={3}
        />
      )}
    </MapContainer>
  );
};

export default MapComponent;
