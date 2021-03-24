const mongoose = require('mongoose')
const {Schema, model} = mongoose

const collegeSchema = new Schema({
	name: {type: String, required: true},
	location: {type: String, required: true},
	cost: {type: String, required: true},
	programsOfInterest: {type: String, required: true},
	hasApplied: {type: Boolean, default: false},
	hasBeenAccepted: {type: Boolean, default: false}
})

const Colleges = model('Colleges', collegeSchema)


module.exports = Colleges





// const colleges = [
// 	{
// 		name:'Clark Atlanta University',
// 		location: 'Atlanta, GA',
// 		cost: '$70,000',
// 		programsOfInterest: ['Psychology','Sociology'],
// 		hasApplied: false,
// 		hasBeenAccepted: false
// 	},
// 	{
// 		name:'Spelman College',
// 		location: 'Atlanta, GA',
// 		cost: '$90,000',
// 		programsOfInterest: ['Psychology','Sociology'],
// 		hasApplied: false,
// 		hasBeenAccepted: false
// 	}, 
// 	{
// 		name:'Howard University',
// 		location: 'Washington D.C.',
// 		cost: '$90,000',
// 		programsOfInterest: ['Psychology','Sociology'],
// 		hasApplied: false,
// 		hasBeenAccepted: false
// 	} 
// ]







// module.exports = colleges