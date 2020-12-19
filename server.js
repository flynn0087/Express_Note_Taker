//dependencies for the server functionality
const express = require("express");
const path = require("path");
const fs = require("fs");

//sets up the express app and initial port, process.env will allow heroku's default
const app = express();
const PORT = process.env.PORT || 3000;

//this creates the absoulte path and allows serving of files
const initialDir = path.join(__dirname, "/public");
app.use(express.static("public"));

//this allows the express app to parse the data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//this is an html route
app.get("/notes", (req, res) => {
    res.sendFile(path.join(initialDir, "notes.html"));
});

//these are the API routes
app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./db/db.json"));
});

app.get("/api/notes/:id", (req, res) => {
    let allNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    res.json(allNotes[Number(req.params.id)]);
});

//this was another html route, but due to wildcard symbol needed to be after the other routes
app.get("*", function(req, res) {
    res.sendFile(path.join(initialDir, "index.html"));
});

//the listener that starts the server
app.listen(PORT, function() {
    console.log("App is listening on PORT: " + PORT);
});