import logo from './logo.svg';
import './App.css';
import MapComponent from "./MapComponent";
import "leaflet/dist/leaflet.css";

function App() {
  const coordinates = [40.7826, -73.968285]; // Example coordinates
  return (
    <div className="App">
      <div>
        <h1>OpenStreetMap Example</h1>
        <MapComponent className="mapComponents" coordinates={coordinates} />
      </div>
    </div>
  );
}

export default App;
