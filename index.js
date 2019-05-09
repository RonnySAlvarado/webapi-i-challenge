// implement your API here

const express = require("express");

const server = express();
const port = 9000;

const db = require("./data/db.js");

server.listen(port, () => console.log(`API running on port ${port}`));
