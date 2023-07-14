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
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";

const MapComponent = ({ coordinates, trackPoints }) => {
  const customMarker = new L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [13, 0],
  });
  const [currentTrackPoints, setTrackpoints] = useState(null);

  useEffect(() => {
    if (trackPoints !== undefined) {
      setTrackpoints(trackPoints);
    } else {
      return;
    }
  }, [trackPoints]);

  // Function to calculate the distance between two points using the Haversine formula
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance.toFixed(2); // Round to 2 decimal places
  };

  // Calculate the total distance of the track
  const totalDistance = trackPoints
    ? trackPoints.reduce((total, point, index) => {
        if (index < trackPoints.length - 1) {
          const [lat, lon] = point;
          const [nextLat, nextLon] = trackPoints[index + 1];

          // Check if lat and lon are valid numbers
          if (
            !isNaN(lat) &&
            !isNaN(lon) &&
            !isNaN(nextLat) &&
            !isNaN(nextLon)
          ) {
            const distance = calculateDistance(lat, lon, nextLat, nextLon);
            return total + Number(distance);
          }
        }
        return total;
      }, 0)
    : 0;
  // Round the total distance to 2 decimal places
  const roundedDistance = totalDistance.toFixed(2);
    const [splitCount, setSplitCount] = useState(0);
    const waypoints = [];

    if (trackPoints && splitCount > 0) {
      const splitDistance = totalDistance / splitCount;

      let accumulatedDistance = 0;
      let previousPoint = null;

      for (const point of trackPoints) {
        if (previousPoint) {
          const [lat, lon] = point;
          const [prevLat, prevLon] = previousPoint;

          const segmentDistance = calculateDistance(lat, lon, prevLat, prevLon);
          accumulatedDistance += Number(segmentDistance);

          if (accumulatedDistance >= splitDistance) {
            const fraction =
              (splitDistance - (accumulatedDistance - segmentDistance)) /
              segmentDistance;
            const waypointLat = prevLat + (lat - prevLat) * fraction;
            const waypointLon = prevLon + (lon - prevLon) * fraction;

            waypoints.push([waypointLat, waypointLon]);
            accumulatedDistance = 0;
          }
        }

        previousPoint = point;
      }
    }
      const handleSplitCountChange = (e) => {
        const value = parseInt(e.target.value);
        setSplitCount(value);
      };

  return (
    <>
      <div>
        {trackPoints && !isNaN(roundedDistance) && (
          <p>Total Distance: {roundedDistance} km</p>
        )}
        <label htmlFor="splitCount">Number of Splits:</label>
        <input
          type="number"
          id="splitCount"
          name="splitCount"
          value={splitCount}
          onChange={handleSplitCountChange}
        />
      </div>
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
        {waypoints.map((waypoint, index) => (
          <Marker
            key={index}
            position={waypoint}
            icon={
              new Icon({
                iconUrl: markerIconPng,
                iconSize: [25, 41],
                iconAnchor: [12, 41],
              })
            }
          />
        ))}
      </MapContainer>
    </>
  );
};

export default MapComponent;
