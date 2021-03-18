require('dotenv').config()
const server = require("./api/server");
// console.log(server)
const port = process.env.PORT;

// START YOUR SERVER HERE
server.listen(port, () => {
  console.log(`\n *** listening to port: ${port} *** \n`);
});
