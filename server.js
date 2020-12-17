//dependencies for the server functionality
const express = require("express");
const path = require("path");

//sets up the express app and initial port, process.env will allow heroku's default
const app = express();
const PORT = process.env.PORT || 3000;

//this allows the express app to parse the data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//the listener that starts the server
app.listen(PORT, function() {
    console.log("App is listening on PORT: " + PORT);
});