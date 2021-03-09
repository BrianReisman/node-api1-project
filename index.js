const server = require("./api/server");
// console.log(server)
const port = 5000;

// START YOUR SERVER HERE

server.listen(port, () => {
  console.log(`listening to port: ${port}`);
});
