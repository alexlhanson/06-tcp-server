'use strict';

const net = require('net');

const port = process.env.port || 3000;

const server = net.createServer();

server.listen(port, () => {
  console.log(`server up and running on port: ${port}`);
});