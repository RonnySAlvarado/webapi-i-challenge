// implement your API here

const express = require("express");

const server = express();
const port = 9000;

server.use(express.json());

const db = require("./data/db.js");

// GET REQUEST
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

// POST REQUEST
server.post("/api/users", (req, res) => {
  const newUser = req.body;
  console.log(newUser);
  if (newUser.name && newUser.bio) {
    db.insert(newUser)
      .then(addedUser => {
        res.status(201).json(addedUser);
      })
      .catch(err => {
        res.status(500).json({
          error: "There was an error while saving the user to the database"
        });
      });
  } else {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  }
});

// DELETE REQUEST
server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then(removedUser => {
      if (removedUser) {
        res.json(removedUser);
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res.status(500).json({ err: "The user could not be removed" });
    });
});

server.listen(port, () => console.log(`API running on port ${port}`));
