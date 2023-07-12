import React, {useState} from "react";
import MapComponent from "./MapComponent";


const UploadComponent = () => {

    const [selectedFile, setSelectedFile] = useState(null);
     const [responsePoints, setResponsePoints] = useState(0);


    const handleFileChange = (event) => {
      setSelectedFile(event.target.files[0]);
    };

    const handleFileUpload = () => {
      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);

        fetch('http://localhost:3001/upload', {
          method: "POST",
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
           const response = JSON.stringify(data);
           // const { points } = response;
           const dataOne = data.points.map((point) => [
             point.lat,
             point.lon,
           ]);
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
    <div>
      <input type="file" accept=".gpx" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload GPX</button>
      {responsePoints.length > 0 && (
        <MapComponent trackPoints={responsePoints} />
      )}
    </div>
  );
};

export default UploadComponent;
