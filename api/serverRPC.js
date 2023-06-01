const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");
const { JSONRPCServer } = require("json-rpc-2.0");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://perfect583:admin123@cluster0.tcbb0br.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const incidentSchema = new mongoose.Schema({
  image: String,
  coordinates: {
    lat: Number,
    lon: Number,
  },
  comment: String,
});

const Incident = mongoose.model("Incident", incidentSchema);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

const jsonRpcServer = new JSONRPCServer();


jsonRpcServer.addMethod("createIncident", async ({ image, lat, lon, comment }) => {
  const incident = new Incident({ image, coordinates: { lat, lon }, comment });
  await incident.save();

  return incident;
});

jsonRpcServer.addMethod("getIncidents", async () => {
  const incidents = await Incident.find();

  return incidents;
});

app.post("/api/jsonrpc", async (req, res) => {
  const jsonRpcRequest = req.body;
  jsonRpcServer.receive(jsonRpcRequest).then((jsonRpcResponse) => {
    if (jsonRpcResponse) {
      res.json(jsonRpcResponse);
    } else {
        res.sendStatus(204);
    }
}) 
});
app.post("/uploads", upload.single("image"), (req, res) => {
  res.send(req.file.filename);
});


    

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
