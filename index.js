require('dotenv').config();
import { Client } from 'discord.js';

const client = new Client();

import { DataHandler } from './utilities/data-handler';

client.on( 'ready', () => {
	console.log( `Logged in as ${client.user.tag}!` );
	console.log( 'Joan ProMax at your service!' );
} );

client.on( 'message', msg => {
	switch ( msg.content ) {
		case 'ping':
			msg.reply( 'Pong!' );
		case '/update-qa':
			DataHandler();
	}
	if ( msg.content === 'ping' ) {
		msg.reply( 'Pong!' );
	}


} );

client.login( process.env.CLIENT_TOKEN );