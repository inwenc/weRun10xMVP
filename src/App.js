import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";
import axios from "axios";
import MapComponent from "./MapComponent";
import UploadComponent from './Upload';
import "leaflet/dist/leaflet.css";

const App = () => {
  //const [gpxPoints, setGpxPoints] = useState([]);
  const coordinates = [40.7826, -73.968285]; // Example coordinates

  // useEffect(() => {
  //   // Fetch the parsed GPX data from the backend
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get("/parsed-gpx");
  //       const { points } = response.data;
  //       setGpxPoints(points);
  //     } catch (error) {
  //       console.error("Error occurred while fetching GPX data", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <div className="App">
      <div>
        <h1>OpenStreetMap Example</h1>
        <MapComponent className="mapComponents" coordinates={coordinates} />
      </div>
      <div className='Upload-Container'>
        <UploadComponent />
      </div>
    </div>
  );
}

export default App;
