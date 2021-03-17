const express = require('express');
const app = express();



// REQUIRED!!!!!

const colleges = require('./models/colleges.js')
console.log(colleges)

// SET UP INDEX ROUTE
	// this route will display a list of the colleges in the array

app.get('/colleges', (req, res)=>{
	res.render('index.ejs', {
		allColleges: colleges
	})
})

// SET UP NEW ROUTE
	// this route will send us to a page that will allow us to create a new college using a form
app.get('/colleges/new', (req, res)=>{
	res.render('new.ejs')
})

// SET UP SHOW ROUTE
	// this route will show the information of just one of the items in the list

app.get('/colleges/:indexOfCollegesArray', (req, res)=>{
	//res.send(colleges[req.params.indexOfCollegesArray])
	res.render('show.ejs', {
		college: colleges[req.params.indexOfCollegesArray]
	})
})































app.listen(3000, ()=>{
	console.log(`server is listening!`)
})