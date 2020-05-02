const express = require("express");
const router = express.Router();
const Papa = require("papaparse");
const fs = require('fs')

// TODO: Allow user to input local file path
const filePath = "E:\\Users\\Dicdic Jalique\\Desktop\\CPU_Tracker\\DOH COVID Data Drop_ 20200501\\DOH COVID Data Drop_ 20200501 - 08 Testing Aggregates.csv"
router.get("/testing-centers", (req, res) => {

    const file = fs.createReadStream(filePath);

    let config = {
        complete: (result) => {
            console.log(result.data);
            res.send("Done");
        }
    }
    Papa.parse(file, config);

});

module.exports = router;