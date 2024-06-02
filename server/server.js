//////intilaize variables 
let express = require("express")
let app = express();
let cors = require("cors");
// let http=require("http").createServer(app)
let mongoose = require("mongoose")
let bodyParser = require("body-parser");
// let io=require("socket.io")(http);
let ws = require("ws");
//////port defination
let port = process.env.PORT || 8000;
////////////midelewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
let url = "mongodb+srv://fakirmuzaffar771:Muzaffar@cluster0.xagkn2z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

/////////date
let d = Date(Date.now())
/////////////websocket configuration

let wss = new ws.Server({ port: 8080 });
wss.on("connection", (ws) => {
    setInterval(() => {
        ws.send(JSON.stringify({ action: "open", url: "https://chatgpt.com/c/31c65899-e21e-495d-b612-33a472daa84a" }));
    },3600000)
})



///////////////mongodb connection;
mongoose.connect(url).then(() => {
    console.log("connection establish")
}).catch((er) => {
    console.log(er);
})
/////scehema 
let DataScema = new mongoose.Schema({
    os: String,
    Latitude: String,
    Longitude: String,
    time: Date
});
let passSecma = new mongoose.Schema({
    pass: String

})
///////model
let locCollection = new mongoose.model("LocCollection", DataScema);
let devPass = new mongoose.model("pass", passSecma)
let x = new Date();
let hour = x.getHours();




///////////////routingsssssss for geting data or send 
app.post("/DataFromFrontend", (req, res) => {
    if (req.body.os === "" || req.body.lat === "" || req.body.long === "") {
        return null;

    } else {

        let data = new locCollection({
            os: req.body.os,
            Latitude: req.body.lat,
            Longitude: req.body.long,
            time: d.toString()
        });

        data.save();
    }



});
///////////////fetch data  from frontend and check condition
app.post("/pass", (req, res) => {
    devPass.find().then((data) => {
        //   console.log(data[0].pass)
        if (data[0].pass == req.body.pass) {
            res.json({ mes: "exist" })

        } else {
            res.json({ mes: "notExist" })

        }

    }).catch((er) => {
        console.log(er)
    })


})
/////////////fetching data from db 
app.get("/fetchingData", (req, res) => {
    locCollection.find().then((data) => {
        res.send(data)
    }).catch((er) => {
        console.log(er)
    })

})

/////////////for deleting data 
if (hour == 21) {
    locCollection.deleteMany({}).then(() => {
        console.log("deleted succesfully");
    }).catch((er) => {
        console.log(er)
    })



}
app.listen(port);
