import axios from "axios";
import { useEffect, useState } from "react";
import { Map, Marker } from "pigeon-maps";
function IncidentList() {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/incidents")
      .then((res) => {
        console.log(res);
        setIncidents(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div
      style={{
        margin: "80px 0",
      }}
    >
      {incidents &&
        incidents.map((incident) => (
          <div
            style={{
              width: "70vw",
              display: "flex",
              margin: "0 auto",
              justifyContent: "space-between",
              border: "1px solid black",
              marginBottom: "40px",
              padding: "20px 50px",
              alignItems: "center",
            }}
            key={incident._id}
          >
            <img
              src={incident.image}
              style={{
                width: "300px",
                height: "300px",
              }}
              alt="incident"
            />
            <p
              style={{
                fontSize: "30px",
                fontWeight: "bold",
              }}
            >
              {incident.comment}
            </p>
            <Map
              height={300}
              width={400}
              defaultCenter={[
                incident.coordinates.lat,
                incident.coordinates.lon,
              ]}
              defaultZoom={11}
            >
              <Marker
                width={50}
                anchor={[incident.coordinates.lat, incident.coordinates.lon]}
                color="red"
              />
            </Map>
          </div>
        ))}
    </div>
  );
}

export default IncidentList;





// VERSION WITH RPC

// import axios from "axios";
// import { JSONRPCClient } from "json-rpc-2.0";
// import { useEffect, useState } from "react";
// import { Map, Marker } from 'pigeon-maps'
// const client = new JSONRPCClient((jsonRPCRequest) =>
//   axios
//     .post("http://localhost:5000/api/jsonrpc", jsonRPCRequest)
//     .then((response) => {
//       if (response.status === 200) {
//         return client.receive(response.data);
//       } else if (jsonRPCRequest.id !== undefined) {
//         return Promise.reject(new Error(response.statusText));
//       }
//     })
// );

// function IncidentList() {
//   const [incidents, setIncidents] = useState([]);

//   useEffect(() => {
//     client.request("getIncidents").then((res) => {
//       console.log(res);
//       setIncidents(res);
//     }
//     );
//   }, []);
//   return (
//     <div
//       style={{
//         margin: "80px 0",
//       }}
//     >
//       {incidents &&
//         incidents.map((incident) => (
//           <div
//             style={{
//               width: "70vw",
//               display: "flex",
//               margin: "0 auto",
//               justifyContent: "space-between",
//               border: "1px solid black",
//               marginBottom: "40px",
//               padding: "20px 50px",
//               alignItems: "center",
//             }}
//             key={incident._id}
//           >
//             <img
//               src={incident.image}
//               style={{
//                 width: "300px",
//                 height: "300px",
//               }}
//               alt="incident"
//             />
//             <p
//               style={{
//                 fontSize: "30px",
//                 fontWeight: "bold",
//               }}
//             >
//               {incident.comment}
//             </p>
//             <Map
//               height={300}
//               width={400}
//               defaultCenter={[
//                 incident.coordinates.lat,
//                 incident.coordinates.lon,
//               ]}
//               defaultZoom={11}
//             >
//               <Marker
//                 width={50}
//                 anchor={[incident.coordinates.lat, incident.coordinates.lon]}
//                 color="red"
//               />
//             </Map>
//           </div>
//         ))}
//     </div>
//   );
// }

// export default IncidentList;
