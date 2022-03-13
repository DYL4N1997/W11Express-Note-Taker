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
  console.log(`Server started on port ${PORT}`);
});

