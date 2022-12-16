
const express = require("express");
const app = new express();
const data = require("./dataset.json")
app.use(express.json())
const fs = require("fs");
//CURD-operations
app.get("/hospital", (req, res) => {
    res.send(data);
})
app.post("/hospital", (req, res) => {
    data.push(req.body);
    fs.writeFile("dataset.json", JSON.stringify(data), (err, resp) => {
        if (err) {
            res.send("data can not be written");
        }
        else {
            res.send("data wriiten successfully");
        }
    })
})
app.put("/hospital/:name", (req, res) => {
    let name = req.params.name;
    data.forEach((item) => {
        if (item.hospitalName== name) {
            item.patientCount = req.body.patientCount;
            item.hospitalLocation = req.body.hospitalLocation;
        }
    })
    fs.writeFile("dataset.json", JSON.stringify(data), (err, resp) => {
        if (err) {
            res.send("data can not be update");
        }
        else {
            res.send("data updated successfully");
        }
    })
})
app.delete("/hospital/:name", (req, res) => {
    let name = req.params.name;
    let value = data.filter(item => item.hospitalName !== name);
    fs.writeFile("dataset.json", JSON.stringify(value), (err, resp) => {
        if (err) {
            res.send("data can not be deleted");
        }
        else {
            res.send("data deleted");
        }
    })
})

//1.reading the json file datas
fs.readFile("./dataset.json",(err,data)=>{
        if(err)console.log(err);
        else console.log("reading the files in the hospital server app data  :  "+data);
    })
app.listen(3500);
console.log("server listening to port 3500");