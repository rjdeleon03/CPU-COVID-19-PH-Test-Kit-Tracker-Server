const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Setup routes
// const cases = require("../routes/cases.route");
// app.use("/cases/", cases)

const tests = require("../routes/tests.route");
app.use("/tests/", tests)

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Started on port ${port}`));
