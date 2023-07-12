import React from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";

const MapComponent = ({ coordinates, trackPoints }) => {
    const customMarker = new L.icon({
      iconUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png",
      iconSize: [25, 41],
      iconAnchor: [13, 0],
    });
    //const points = JSON.parse(trackPoints);
    // let positions = null;
    // positions = trackPoints.points? trackPoints.points.map((point) => [point.lat, point.lon])
    //   : null;
   // console.log("type", trackPoints);
   const positions = [
    [
        40.776253,
        -73.964262
    ],
    [
        40.776903,
        -73.963786
    ],
    [
        40.77694,
        -73.963928
    ],
    [
        40.777146,
        -73.963782
    ],
    [
        40.777152,
        -73.963826
    ],
    [
        40.777294,
        -73.964097
    ],
    [
        40.777934,
        -73.965038
    ],
    [
        40.77799,
        -73.96514
    ],
    [
        40.778081,
        -73.965373
    ],
    [
        40.778167,
        -73.965789
    ]]

  return (
    <MapContainer style={{ height: "100vh" }} center={coordinates} zoom={13}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {(trackPoints !== undefined && trackPoints.length > 0) && (
        <Polyline positions={positions} fillColor="red" color="blue" weight={3} />
      )}
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
