const tmi = require('tmi.js');
require('dotenv').config();

console.log(process.env.BOT_USERNAME);
const options = {
    identity: {
        username: process.env.BOT_USERNAME,
        password: process.env.OAUTH_TOKEN
    },
    channels: [
        process.env.CHANNEL_NAME
    ]
};

const client = new tmi.client(options);

client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

client.connect();

function onMessageHandler(channel, tags, message, self) {
    if(self) return;
    console.log(message);
    console.log(tags);
    console.log(`channel: ${channel}`);
    const commandName = message.trim();

    if (commandName.toLowerCase() == '!hola') {
        client.say(channel, `@${tags.username}, heya!`);
    }

    if (commandName.toLowerCase() == '!chiste') {
        client.say(channel, chistes[0]);
    }
}

function onConnectedHandler(addr, port) {
    console.log(`* Connected to ${addr}:${port}`);
}

const chistes = [
    `¿Por qué las focas del circo miran siempre hacia arriba?
    Porque es donde están los focos.`
]