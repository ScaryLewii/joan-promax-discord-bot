require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const { DataHandler } = require( './utilities/data-handler' );


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
	switch ( msg.content ) {
		case 'hi':
			msg.reply(`Hello ${msg.author.username}. \nJoan ProMax's at your services.`);
		case 'update-qa':
			DataHandler();
	}
});
