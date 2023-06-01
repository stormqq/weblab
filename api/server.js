const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://perfect583:admin123@cluster0.tcbb0br.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});



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

app.post("/api/incidents", upload.single("image"), async (req, res) => {
  const { image, lat, lon, comment } = req.body;

  const incident = new Incident({ image, coordinates: { lat, lon }, comment });
  await incident.save();

  res.status(201).json(incident);
});

app.get("/api/incidents", async (req, res) => {
  const incidents = await Incident.find();
  res.json(incidents);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
