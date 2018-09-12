'use strict';

// Requires
const net = require('net');
const ee = require('events');

//3rd Party Requires
const uuid = require('uuid');

//server env
const port = process.env.port || 3000;
const server = net.createServer();
const events = new ee();

//start up server
server.listen(port, () => {
  console.log(`server up and running on port: ${port}`);
});

//user pool and constructor

const userPool = {};

let User = function(socket){
  let id = uuid();
  this.id = id;
  this.nickname = `User : <${id}>`;
  this.socket = socket;

};

//setup listener

server.on('connection', (socket) => {
  console.log('opened socket');

  //create new user on connection socket and add to user pool
  let user = new User(socket);
  userPool[user.id];

  //create listener for incoming data
  socket.on('data', (buffer) => {
    messageDispatch(user.nickname, buffer);
  });
});

//logic for emitting a message
let messageDispatch = (userName, buffer) => {
  let message = parseOut(buffer);
  events.emit(message.command, userName, message.textBody);//TODO
};

//message parser
let parseOut = (buffer) => {
  let text = buffer.toString().trim();

  if(text.startsWith('@')){
    let [command, textBody] = text.split(/\s+(.*)/);
    return {command, textBody};
  } else {
    let command = '@all';
    let textBody = text;
    return {command, textBody};
  }
};

/********************************************************************************
*         user features                                                         *
********************************************************************************/

//send message 

//user quit

//nickname change

//direct message