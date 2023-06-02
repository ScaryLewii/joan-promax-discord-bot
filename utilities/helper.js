const listQnA = require( '../data/lyceum.json' )

const findAnswer = msg => {
	let str = msg.replace(/\.+/g, "").toLowerCase()
	
	const possibleAnswers = []
	listQnA.forEach( item => {
		if ( item.question.toLowerCase().includes(str) ) {
			possibleAnswers.push(item.answer)
		}
	});

	let reply = ``;
	if (possibleAnswers.length) {
		possibleAnswers.forEach( (item, index) => {
			reply += `${index + 1} - ${item}\n`
		} )
	}
	
	return reply ?? "This is a new Question! Please update!"
}

module.exports = {
	findAnswer
}