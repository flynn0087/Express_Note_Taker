//dependencies for the server functionality
const express = require("express");
const path = require("path");
const fs = require("fs");

//sets up the express app and initial port, process.env will allow heroku's default
const app = express();
const PORT = process.env.PORT || 3000;
const initialDir = path.join(__dirname, "/public")

//this creates the absoulte path and allows serving of files
const initialDir = path.join(__dirname, "/public");
app.use(express.static());

//this allows the express app to parse the data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//these are the routes needed 
app.get("/notes", function(req, res) {
    res.sendFile(path.join(initialDir, "notes.hmtl"));
});

app.get("*", function(reg, res) {
    res.sendFile(path.join(initialDir, "index.html"));
});

app.get("/api/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/db/db.json"));    
});

app.get("/api/notes/:id", function(req, res) {
    let saved = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    res.JSON(saved[Number(req.param.id)]);
});







//the listener that starts the server
app.listen(PORT, function() {
    console.log("App is listening on PORT: " + PORT);
});