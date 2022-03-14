const express = require("express");
const uuid = require("uuid");
const path = require("path");


let noteStore = require("./db/db.json");
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

// Configuration of the API Routes

// Retreiving all inputted notes
app.get("/api/notes", (req, res) => {
    res.json(noteStore);
});

app.post("/api/notes", (req, res) => {
    let newNote = {
        title: req.body.title,
        text: req.body.text,
        id: uuid.v4(),
};

noteStore.push(newNote);
res.json(newNote);



