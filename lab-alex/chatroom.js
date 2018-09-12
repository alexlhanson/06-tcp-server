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
  
  //create new user on connection socket and add to user pool
  let user = new User(socket);
  userPool[user.id] = user;
  
  //create listener for incoming data
  socket.on('data', (buffer) => {
    messageDispatch(user, buffer);
  });
});

//logic for emitting a message
let messageDispatch = (userName, buffer) => {
  let message = parseOut(buffer);
  events.emit(message.command, userName, message.textBody);
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

//send message to all people
events.on('@all',(sender, message) => {
  for (let userID in userPool){
    let user = userPool[userID];
    user.socket.write(`<${sender.nickname}>: ${message}\n`);
  }
});

//user quit

//get all users list

//nickname change
events.on('@nickname', (sender, newName) =>{
  sender.nickname = newName;
  sender.socket.write(`Your nickname has been changed to ${newName}\n`);
});

//direct message

/********************************************************************************
*         Start up server                                                       *
********************************************************************************/

//start up server
server.listen(port, () => {
  console.log(`server up and running on port: ${port}`);
});