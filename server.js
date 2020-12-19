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

//this is the section to add a note
app.post("/api/notes", (req, res) => {
    let allNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let noteNum = (allNotes.length).toString();
    let nextNote = req.body;
    nextNote.id = noteNum;
    allNotes.push(nextNote);
    fs.writeFileSync("./db/db.json", JSON.stringify(allNotes));
    res.json(allNotes);
    console.log("Note saved");
})

//this is the section to delete a note, it will also re-assign the numbered id
app.delete("/api/notes/:id", (req, res) => {
    let allNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let noteNum = req.params.id;
    let noteStartNum = 0;
    allNotes = allNotes.filter(selectedNote => {
        return selectedNote.id != noteNum;
    })
    for (selectedNote of allNotes) {
        selectedNote.id = noteStartNum.toString();
        noteStartNum++;
    }
    fs.writeFileSync("./db/db.json", JSON.stringify(allNotes));
    res.json(allNotes);
    console.log("Deleted note");
})

//the listener that starts the server
app.listen(PORT, function() {
    console.log("App is listening on PORT: " + PORT);
});