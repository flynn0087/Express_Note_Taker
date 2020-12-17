//dependencies for the server functionality
const express = require("express");
const path = require("path");

//sets up the express app and initial port, process.env will allow heroku's default
const app = express();
const PORT = process.env.PORT || 3000;

