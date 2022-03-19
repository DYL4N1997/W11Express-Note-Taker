const express = require("express");
const path = require("path");
const uuid = require("uuid");

let noteStore = require("./db/db.json");
const fs = require("fs");

// Starting express
const app = express();
const PORT = process.env.PORT || 3001;

// listening for server on Heroku port or 3001 locally
app.listen(PORT, () => {
    console.log(`
  
    ______________________________________
   |                                      |
   |    Server started on port ${PORT}    |
   |______________________________________|
 `);
});

// Tool middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set a static folder for express
app.use(express.static("public"));

// HTML REQUESTS
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

// API ROUTES

// Get all availble notes from the store
app.get("/api/notes", (req, res) => {
  res.json(noteStore);
});

// Creates  a new note
app.post("/api/notes", (req, res) => {
  const newNote = {
    title: req.body.title,
    text: req.body.text,
    id: uuid.v4(),
  };

  noteStore.push(newNote);

  fs.writeFile("db/db.json", JSON.stringify(noteStore), (err) => {
    if (err) throw err;
    console.log("Database error has occured");
  });

  res.json(noteStore);

});

// Deleting a note
app.delete("api/notes/:id", (req,res) => {
    let { id } = req.params;
    let findNote = noteStore.findIndex((note) => note.id !== id);
    let delNote = noteStore.splice(findNote, 1);
    res.send(delNote);

    fs.writeFile("db/db.json", JSON.stringify(noteStore), (err) => {
        if (err) throw err;
        console.log("Database error has occured");
      });

      app.listen(PORT, () => 
      console.log(`App is available at http://localhost:${PORT}`)); 
})