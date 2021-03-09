// BUILD YOUR SERVER HERE
const express = require("express");
const actions = require("./users/model");

const server = express();

server.use(express.json());

server.get("/api/users", async (req, res) => {
  actions.find()
    .then(users => {
      if(!users){
        // console.log('promise resolved but no data')
        res.status(400).send({message: 'no users found'}) //!Check status code
      } else {
        // console.log(users, 'log')
        res.status(200).send(users)
      }
    })
    .catch(err => {
      console.log('error in request', err)
    })
  // 1- pull info from request <optional; and validate it>
  // 2- interact with the database
  // 3- send the client an appropriate response

});


// server.post("/api/users", (req, res) => {});
// server.get("/api/users/:id", (req, res) => {});
// server.delete("/api/users/:id", (req, res) => {});
// server.put("/api/users/:id", (req, res) => {});

module.exports = server; // EXPORT YOUR SERVER instead of {}
