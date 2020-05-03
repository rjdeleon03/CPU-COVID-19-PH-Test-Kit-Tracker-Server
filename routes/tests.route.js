const express = require("express");
const router = express.Router();
const Papa = require("papaparse");
const SortedMap = require("collections/sorted-map");
const fs = require('fs')

// TODO: Allow user to input local file path
const filePath = "E:\\Users\\Dicdic Jalique\\Desktop\\CPU_Tracker\\DOH COVID Data Drop_ 20200501\\DOH COVID Data Drop_ 20200501 - 08 Testing Aggregates.csv"
router.get("/testing-centers", (req, res) => {

    const file = fs.createReadStream(filePath);

    var testingCentersMap = new SortedMap();

    let config = {
        complete: (result) => {
            result.data.forEach(item => {
                const testingCenter = {
                    name: item[0],
                    code: item[1],
                    // dailyOutputPositiveIndivs: item[2],
                    // dailyOutputPositiveIndivs: item[3],
                    testedIndivs: parseInt(item[5].replace(",", "")),
                    testedIndivsPositive: parseInt(item[6].replace(",", "")),
                    testedIndivsPositivePercent: item[7],
                    testedIndivsNegative: parseInt(item[8].replace(",", "")),
                    testedIndivsNegativePercent: item[9],
                    testsConducted: parseInt(item[14].replace(",", "")),
                    testsRemaining: parseInt(item[16].replace(",", "")),
                    dateLastUpdated: item[18],

                }
                testingCentersMap.set(testingCenter.name, testingCenter);
                // console.log(item);
            })
            const entries = Array.from(testingCentersMap.values());
            console.log(entries);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ "testing-centers": entries }));
        }
    }
    Papa.parse(file, config);

});

module.exports = router;