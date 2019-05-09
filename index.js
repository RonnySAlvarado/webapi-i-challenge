// implement your API here

const express = require("express");

const server = express();
const port = 9000;

server.use(express.json());

const db = require("./data/db.js");

server.get("/api/users", (req, res) => {
  db.find()
    .then(users => {
      res.send(users); // or res.status(200).json(user);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The users information could not be retrieved" });
    });
});

server.listen(port, () => console.log(`API running on port ${port}`));
