# TCP Server Chatroom Application

## Setup
- 1) To setup this application fork and/or clone this repository onto your machine.  
- 2) Run npm install in the file folder where you cloned the repository. 
- 3) In CLI: type `node lab-alex/chatroom.js ` to start up the server
- 4) Others can join the chatroom by logging in through `nc <host> <port>`. By default it is set to use localhost and 3000, respectively.

## Commands/ Application Use

Once a user has logged into the telnet chatroom the following commands become available:

- @all <message>: Sends a message to everyone logged into the server
- @quit: Ends session and logs out of the server.  At this point the user and user information will be removed from the pool.
- @list: Will print a list of all logged in users by nickname
- @nickname <name>: Will change the nickname from default unique user id to name of choosing.
- @dm <to-username> <message>: Will send a direct message to the to-username.
