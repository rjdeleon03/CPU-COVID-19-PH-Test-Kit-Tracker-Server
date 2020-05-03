const express = require("express");
const router = express.Router();

const { StringStream } = require("scramjet");
const request = require("request");

router.get("/rankings", (req, res) => {

    let worldData = [];
    request.get("https://opendata.ecdc.europa.eu/covid19/casedistribution/csv")
        .pipe(new StringStream())
        .CSVParse()
        .consume(object => {
            worldData.push(object);
            console.log(object);
        })
        .then(() => {
            console.log("Done!");
            res.send("hello");
        });


});

module.exports = router;