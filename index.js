const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const http = require("http").Server(app);
const port = process.env.PORT || 8080
const cors = require("cors");
const useragent = require("express-useragent");

app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(express.static("public"));
app.use(useragent.express());

app.set("port", (process.env.PORT || 5000));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/whoami", function (req, res) {
  const ipaddress = req.ip;
  const language = req.acceptsLanguages();
  const software = req.useragent.source;

  res.json({"ipaddress": ipaddress, "language": language[0], "software": software});
});


// listen for requests :)
app.listen(app.get("port"), function() {
  console.log("Node app is running on port", app.get("port"));
});
