import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";
import axios from "axios";
import MapComponent from "./MapComponent";
import "leaflet/dist/leaflet.css";

const App = () => {
  //const [gpxPoints, setGpxPoints] = useState([]);
  const coordinates = [40.7826, -73.968285]; // Example coordinates

 const [selectedFile, setSelectedFile] = useState(null);
 const [responsePoints, setResponsePoints] = useState(0);

 const handleFileChange = (event) => {
   setSelectedFile(event.target.files[0]);
 };

 const handleFileUpload = () => {
   if (selectedFile) {
     const formData = new FormData();
     formData.append("file", selectedFile);

     fetch("http://localhost:3001/upload", {
       method: "POST",
       body: formData,
     })
       .then((response) => response.json())
       .then((data) => {
         const dataOne = data.points.map((point) => [point.lat, point.lon]);
         setResponsePoints(dataOne);
         // onUploadComplete(response);
         console.log("points", dataOne);
       })
       .catch((error) => {
         console.error("Error occurred during upload", error);
       });
   }
 };

  return (
    <div className="App">
      <div>
        <h1>OpenStreetMap Example</h1>
        <MapComponent
          className="mapComponents"
          coordinates={coordinates}
          trackPoints={responsePoints}
        />
      </div>
      <div className="Upload-Container">
        <input type="file" accept=".gpx" onChange={handleFileChange} />
        <button onClick={handleFileUpload}>Upload GPX</button>
      </div>
    </div>
  );
}

export default App;
