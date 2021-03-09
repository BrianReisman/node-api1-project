// BUILD YOUR SERVER HERE
const express = require("express");
const actions = require("./users/model");

const server = express();

server.use(express.json());

//promise. chaining .then().catch() onto an action invoked.
server.get("/api/users", async (req, res) => {
  actions
    .find()
    .then((users) => {
      if (!users || users.length === 0) {
        res.status(400).send({ message: "no users found" }); //!Check status code
      } else {
        res.status(200).send(users);
      }
    })
    .catch((err) => {
      console.log("error in request", err);
      res.status(400).send(err);
    });
});

//async/await needs to be put in a try/catch so give that which is being awaited on, a chance to resolve.
server.get("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await actions.findById(id);
    res.status(200).send(user);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

server.post("/api/users", (req, res) => {
  const { name, bio } = req.body;
  if (
    typeof name !== "string" ||
    typeof bio !== "string" ||
    name.length < 1 ||
    bio.length < 1
  ) {
    res.status(400).json("All inputs are required");
  } else {
    actions
      .insert(req.body)
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => res.status(400).send(err, "error"));
  }
});

server.delete("/api/users/:id", async (req, res) => {
  // 1- pull info from request <optional; and validate it>
  const { id } = req.params;
  console.log(id);

  // 2- interact with the database
  try {
    const deleteConfirmation = await actions.remove(id);
    if (!deleteConfirmation) {
      res.status(400).send("No user by that id exists");
    } else {
      // 3- send the client an appropriate response
      res.status(200).send(deleteConfirmation);
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
});

server.put("/api/users/:id", (req, res) => {
  //arrange the pieces
  const { id } = req.params;
  const updatedUser = req.body;

  actions
    .update(id, updatedUser)
    .then((data) => {
      if (!data) {
        //return/resolve
        res
          .status(400)
          .json(
            "Opps! There is an issue. Either there's no user with that idea, or we messed up!"
          );
      } else {
        //return/resolve
        res.status(200).json(data);
      }
    })
    //return/resolve
    .catch((err) => {
      res.status(400).json(err);
      // console.log(err);
    });
});

module.exports = server; // EXPORT YOUR SERVER instead of {}

//!
//?
//*
//todo
/*
1. Just like one returns stops a function or loop, it seems some res.methods() act like returns for instance .send() or .json() but not .status(). Is there a way to figure out which to put at the end of the chain? (the 'order of operations') ie. we don't write res.send().status() ever, do we? Is there a name for these types of methods?
1b. What is the difference between terminating with .send() vs .json()
2. What is the best way to inspect the request object from within the endpoint. I've tried to return the request object to my postman via res.send() but get the following: "TypeError: Converting circular structure to JSON"
2b. How do you suggest inspecting the error that comes back from either the .catch in then/catch or from .catch(err) in try/catch. I never know if what I'm looking for is in err or in err.message or otherwise.
3. What is the best/easier ways to break our promises and try/catches if we want to test the different ways an error might occur? What are the main types of errors we will want to keep in mind to handle?
4. I wrote a "server" script in my package.json that only works when I write 'npm run server' into the terminal, 'npm server' does not work. Why is this, when 'npm start' works just as well as 'npm run start' (the 'run' seems optional here)
*/
//todo
//*
//?
//!
