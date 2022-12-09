const fs = require( 'fs' );

const axios = require( 'axios' );
const $     = require( 'cheerio' );
const url   = `${ process.env.FETCH_URL_VIE }`;

const lyceum = [];

const DataHandler = async () => {
	await axios.get( url )
		.then( ( html ) => {
			$( '.wp-block-table table tbody tr', html.data ).each( ( i, el ) => {
				// console.log(el.children[2].children[0]);
				let QnA = { 
					question: el.children[1].children[0].data,
					answer  : el.children[2] ? el.children[2].children[0] ? el.children[2].children[0].data : '' : ''
				}

				lyceum.push( QnA );
			} )
		} )
		.then( () => {
			const _data = lyceum.map( JSON.stringify ); 
			const uniqueSet = new Set( _data ); 
			const uniqueArray = Array.from( uniqueSet ).map( JSON.parse );

			fs.writeFileSync( './data/lyceum.json', JSON.stringify( uniqueArray ) )
		} )
		.catch( ( err ) => {
			console.log( err );
		} );
}

module.exports = {
	DataHandler
}