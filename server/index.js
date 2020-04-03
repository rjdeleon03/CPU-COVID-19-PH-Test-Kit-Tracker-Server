const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Use kits for /api/kits path
const kits = require("./routes/api/kits.js");
app.use("/api/kits", kits);

const port = process.env.PORT || 5000;

// Start server
app.listen(port, () => console.log("Started on port ${port}"));
