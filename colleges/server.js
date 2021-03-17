const express = require('express');
const app = express();



const colleges = [
	{
		name:'Clark Atlanta University',
		location: 'Atlanta, GA',
		cost: '$70,000',
		hasApplied: false,
		hasBeenAccepted: false
	},
	{
		name:'Spelman College',
		location: 'Atlanta, GA',
		cost: '$90,000',
		hasApplied: false,
		hasBeenAccepted: false
	}, 
	{
		name:'Howard University',
		location: 'Washington D.C.',
		cost: '$90,000',
		hasApplied: false,
		hasBeenAccepted: false
	} 
]

// SET UP INDEX ROUTE
	// this route will display a list of the colleges in the array

app.get('/colleges', (req, res)=>{
	res.send(colleges)
})


// SET UP SHOW ROUTE
	// this route will show the information of just one of the items in the list

app.get('/colleges/:indexOfCollegesArray', (req, res)=>{
	res.send(colleges[req.params.indexOfCollegesArray])
})































app.listen(3000, ()=>{
	console.log(`server is listening!`)
})