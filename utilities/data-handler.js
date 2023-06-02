const fs = require( 'fs' );
const dotenv   = require( 'dotenv' );
dotenv.config();

const axios = require( 'axios' );
const $     = require( 'cheerio' );
const url   = `${ process.env.FETCH_URL }`;

const lyceum = [];
const dataSelector = '.ninja_table_wrapper table tbody tr';

const DataHandler = async () => {
	await axios.get( url )
		.then( ( html ) => {
			$( dataSelector, html.data ).each( ( i, el ) => {
				// console.log(el.children[1]);
				// console.log(el.children[0]?.children[0]?.data);
				let QnA = { 
					question: el.children[1]?.children[0]?.data,
					answer  : el.children[2]?.children[0] ? el.children[2].children[0].data : ''
				}

				if ( el.children[1].children[0]?.data ) {
					lyceum.push( QnA );
				}
			} )
		} )
		.then( () => {
			const _data = lyceum.map( JSON.stringify ); 
			const uniqueSet = new Set( _data ); 
			const uniqueArray = Array.from( uniqueSet ).map( JSON.parse );

			fs.writeFileSync( './data/lyceum.json', JSON.stringify( uniqueArray ) )
		} )
		.then( () => console.log( 'Questions and Answers updated!!!' ) )
		.catch( ( err ) => {
			console.log( err );
		} );
}

module.exports = {
	DataHandler
}