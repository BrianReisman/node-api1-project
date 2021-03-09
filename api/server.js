// BUILD YOUR SERVER HERE
const express = require("express");
const actions = require("./users/model");

const server = express();

server.use(express.json());

//promise. chaining .then().catch() onto an action invoked.
server.get("/api/users", async (req, res) => {
  actions.find()
    .then(users => {
      if(!users || users.length === 0){
        console.log('promise resolved but no data')
        res.status(400).send({message: 'no users found'}) //!Check status code
      } else {
        console.log('users, users, we got some users here!', users)
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


//async/await needs to be put in a try/catch so give that which is being awaited on, a chance to resolve.
server.get("/api/users/:id", async (req, res) => {
  const {id} = req.params;
  try{
    const user = await actions.findById(id)
    console.log(user)
    res.status(200).send(user)
  } catch(err){
    console.log(err)
  }
});

// server.post("/api/users", (req, res) => {});
// server.delete("/api/users/:id", (req, res) => {});
// server.put("/api/users/:id", (req, res) => {});

module.exports = server; // EXPORT YOUR SERVER instead of {}
