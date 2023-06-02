require('dotenv').config();

const { Client, GatewayIntentBits } = require('discord.js');
const { DataHandler } = require( './utilities/data-handler' );
const { findAnswer } = require('./utilities/helper');

const client = new Client({ intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMessageTyping,
	] 
});

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.login( process.env.CLIENT_TOKEN );

client.on('messageCreate', msg => {
	if (msg.content === "hi") {
		msg.reply(`Joan ProMax's at your services.`);
		return;
	}

	if (msg.content === "update-qa") {
		DataHandler();
		return
	}

	if (msg.content.includes("..")) {
		msg.reply(findAnswer(msg.content));
		return
	}
});