////// Initialize variables
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const http = require("http").createServer(app);
const ws = require("ws");

////// Port definition
const port = process.env.PORT || 8000;
const wsPort = process.env.WS_PORT || 8080;

//////////// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

let url = "mongodb+srv://fakirmuzaffar771:Muzaffar@cluster0.xagkn2z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

///////// Date
let d = new Date().toISOString();

///////////// WebSocket configuration
const wss = new ws.Server({ server: http });
wss.on("connection", (socket) => {
    console.log('WebSocket connection established');
    setInterval(() => {
        socket.send(JSON.stringify({ action: "open", url: "https://chatgpt.com/c/31c65899-e21e-495d-b612-33a472daa84a" }));
    }, 3600000);
});

/////////////// MongoDB connection
mongoose.connect(url)
    .then(() => console.log("MongoDB connection established"))
    .catch((err) => console.log(err));

///// Schema 
const DataSchema = new mongoose.Schema({
    os: String,
    Latitude: String,
    Longitude: String,
    time: Date
});
const PassSchema = new mongoose.Schema({
    pass: String
});

/////// Model
const LocCollection = mongoose.model("LocCollection", DataSchema);
const DevPass = mongoose.model("Pass", PassSchema);

let x = new Date();
let hour = x.getHours();

/////////////// Routes for getting data or sending
app.post("/DataFromFrontend", (req, res) => {
    if (req.body.os == "" || req.body.lat == "" || req.body.long == "") {
        return null;

    }
    else {
        let data = new LocCollection({
            os: req.body.os,
            Latitude: req.body.lat,
            Longitude: req.body.long,
            time: d
        });

        data.save().then(() => res.status(200).send("Data saved")).catch((err) => res.status(500).send("Error saving data"));

    }
});





/////////////// Fetch data from frontend and check condition
app.post("/pass", (req, res) => {
    DevPass.findOne().then((data) => {
        if (data.pass === req.body.pass) {
            res.json({ mes: "exist" });
        } else {
            res.json({ mes: "notExist" });
        }
    }).catch((err) => res.status(500).send("Error fetching data"));
});

///////////// Fetching data from DB 
app.get("/fetchingData", (req, res) => {
    LocCollection.find().then((data) => {
        res.json(data);
    }).catch((err) => res.status(500).send("Error fetching data"));
});

///////////// For deleting data 
if (hour === 21) {
    LocCollection.deleteMany({})
        .then(() => console.log("Deleted successfully"))
        .catch((err) => console.log("Error deleting data"));
}

///////////// Start the server
http.listen(port, () => {
});

// ///////////// Graceful shutdown
// process.on('SIGTERM', () => {
//     console.log('SIGTERM signal received: closing HTTP server');
//     http.close(() => {
//         console.log('HTTP server closed');
//         mongoose.connection.close(false, () => {
//             console.log('MongoDB connection closed');
//             process.exit(0);
//         });
//     });
// });
