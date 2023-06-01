import { useState } from 'react';
import axios from 'axios';

const IncidentForm = () => {
  const [image, setImage] = useState(null);
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formImage = new FormData();
    formImage.append('file', image);
    formImage.append('upload_preset', 'incidents');
    formImage.append('folder', 'incident_images');

    const response = await axios.post(
      'https://api.cloudinary.com/v1_1/dca8ufijx/image/upload',
      formImage
    );
    const imageUrl = response.data.secure_url;

    const formData = new FormData();
    formData.append('image', imageUrl);
    formData.append('lat', lat);
    formData.append('lon', lon);
    formData.append('comment', comment);

    const res = await axios.post('http://localhost:5000/api/incidents', formData);
    console.log(res);

    setImage(null);
    setLat('');
    setLon('');
    setComment('');
  };

  return (
    <form style={{
      display: 'flex',
      justifyContent: 'center',
      margin: '80px 0',
      gap: '20px',
      alignItems: 'center',
    }} onSubmit={handleSubmit}>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <input style={{
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid black',
      }}
        type="text"
        placeholder="Latitude"
        value={lat}
        onChange={(e) => setLat(e.target.value)}
      />
      <input
      style={{
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid black',
      }}
        type="text"
        placeholder="Longitude"
        value={lon}
        onChange={(e) => setLon(e.target.value)}
      />
      <input
      style={{
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid black',
      }}
        type="text"
        placeholder="Comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button style={{
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid black',
      }} type="submit">Send incident</button>
    </form>
  );
};

export default IncidentForm;


// VERSION WITH RPC

// import { useState } from "react";
// import axios from "axios";
// import { JSONRPCClient } from "json-rpc-2.0";


// const jsonRpcClient = new JSONRPCClient((jsonRpcRequest) =>
//   axios.post("http://localhost:5000/api/jsonrpc", jsonRpcRequest)
// );

// const IncidentForm = () => {
//   const [image, setImage] = useState(null);
//   const [lat, setLat] = useState("");
//   const [lon, setLon] = useState("");
//   const [comment, setComment] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    

//     const formData = new FormData();
//     formData.append("file", image);
//     formData.append("upload_preset", "incidents");
//     formData.append("folder", "incident_images");

//     const response = await axios.post(
//       "https://api.cloudinary.com/v1_1/dca8ufijx/image/upload",
//       formData
//     );
//     const imageUrl = response.data.secure_url;

//     const result = await jsonRpcClient.request(
//       "createIncident",
//       { image: imageUrl, lat, lon, comment }
//     )
//     console.log(result);

//     setImage(null);
//     setLat("");
//     setLon("");
//     setComment("");
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="file"
//         accept="image/*"
//         onChange={(e) => setImage(e.target.files[0])}
//       />
//       <input
//         type="text"
//         placeholder="Latitude"
//         value={lat}
//         onChange={(e) => setLat(e.target.value)}
//       />
//       <input
//         type="text"
//         placeholder="Longitude"
//         value={lon}
//         onChange={(e) => setLon(e.target.value)}
//       />
//       <input
//         type="text"
//         placeholder="Comment"
//         value={comment}
//         onChange={(e) => setComment(e.target.value)}
//       />
//       <button type="submit">Send incident</button>
//     </form>
//   );
// };

// export default IncidentForm;



