const express = require("express");
const path = require("path");
const uuid = require("uuid");

let noteString = require("./db/db.json");
const fs = require("fs");

// initialising express
const app = express();
const PORT = process.env.PORT || 4000;

// listen for sever
app.listen(PORT, () => {
  console.log(`
  
     ______________________________________
    |                                      |
    |    Server started on port ${PORT}    |
    |______________________________________|
  `);
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Static folder for express
app.use(express.static("public"));

// HTML Requests
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "notes.html"));
})

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
})



