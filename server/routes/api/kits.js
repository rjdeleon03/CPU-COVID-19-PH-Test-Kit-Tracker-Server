const express = require("express");
const mongodb = require("mongodb");

const router = express.Router();

// Get kits
router.get("/", async (req, res) => {
  const kits = await loadKitsCollection();
  res.send(await kits.find({}).toArray());
});

// Add kits
router.post("/", async (req, res) => {
  const kits = await loadKitsCollection();
  const addResult = await kits.insertOne({
    dateReceived: req.body.dateReceived,
    source: req.body.source,
    unitsOnHand: req.body.unitsOnHand,
    unitsPledgedMax: req.body.unitsPledgedMax,
    unitsPledgedMin: req.body.unitsPledgedMin,
    unitsUsed: req.body.unitsUsed,
    timestampCreated: new Date().getTime() * -1
  });
  console.log("Added ${addResult.insertedId}");
  res.status(201).send();
});

// Delete kits
router.delete("/:id", async (req, res) => {
  const kits = await loadKitsCollection();
  const deleteResult = await kits.deleteOne({
    _id: new mongodb.ObjectID(req.params.id)
  });
  console.log("Deleted ${deleteResult.deletedCount}: ${req.params.id}");
  res.status(200).send();
});

// Update kits
router.patch("/:id", async (req, res) => {
  const kits = await loadKitsCollection();
  console.log(req);
  const updateResult = await kits.updateOne(
    {
      _id: new mongodb.ObjectID(req.params.id)
    },
    {
      $set: {
        dateReceived: req.body.dateReceived,
        source: req.body.source,
        unitsOnHand: req.body.unitsOnHand,
        unitsPledgedMax: req.body.unitsPledgedMax,
        unitsPledgedMin: req.body.unitsPledgedMin,
        unitsUsed: req.body.unitsUsed,
        timestampModified: new Date().getTime() * -1
      }
    }
  );
  console.log(updateResult);
  res.status(200).send();
});

async function loadKitsCollection() {
  const client = await mongodb.MongoClient.connect(
    "mongodb+srv://cpu-tktracker:9hAVQdsjX4NA5gjk@cluster0-ogkgf.mongodb.net/test?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  );

  return client.db("test").collection("kits");
}

module.exports = router;
