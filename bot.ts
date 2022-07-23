const tmi = require('tmi.js');
require('dotenv').config()

const ascii = require('./asciiArt.json')
const express = require('express');

// Define configuration options
const opts = {
  connection: {
    reconnect: true
  },
  identity: {
    username: "xBaan",
    password: process.env.OAUTH_TOKEN
  },
  channels: ["xBaan"],
  port: process.env.PORT || 5000
};

console.log(process.env.OAUTH_TOKEN)

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler (target: any, context: any, msg: any, self: any) {
  if (self) { return; } // Ignore messages from the bot

  // Remove whitespace from chat message
  const commandName = msg.trim();

  // If the command is known, let's execute it
  if (commandName === '!flip') {
    let rand = Math.random()
    switch(true){
        case rand <= 0.5:
            client.say(target, ascii.ASCII_SKYYART)
            break
        case rand < 0.9 && rand > 0.5:
            client.say(target, ascii.ASCII_1HEAD)
            break
        case rand >= 0.9:
            client.say(target, ascii.ASCII_ZAPATOS)
            break
        default:
            client.say(target, 'Default')
    }
    return console.log(`* Executed ${commandName} command`);
  }

    return console.log(`* Unknown command ${commandName}`);
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr: string, port: string) {
  console.log(`* Connected to ${addr}:${port}`);
}

// THIS PART IS FOR HEROKU
const app = express();
const port = process.env.PORT || 3000;
app.listen(port, () => {
   console.log(`listening on ${port}`);
});