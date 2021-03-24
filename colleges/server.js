const express = require('express');
const app = express();

// REQUIRED!!!!!

const colleges = require('./models/colleges.js')
console.log(colleges)

// HAVE FORM SUBMIT TO SERVER
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// METHOD OVERRIDE

const methodOverride = require('method-override')
app.use(methodOverride('_method'))


// MONGO/MONGOOSE DATABASE

const mongoose = require('mongoose')

const mongoURI = 'mongodb://127.0.0.1:27017/collegeapp'

const db = mongoose.connection

mongoose.connect(mongoURI, {
	useFindAndModify: false,
	useNewUrlParser: true,
	useUnifiedTopology: true
}, ()=>{
	console.log(`database connection checked`)
})

db.on('error', (err)=>{ console.log(`ERROR: `, err)})
db.on('connected', ()=>{console.log(`mongo connected`)})
db.on('disconnected', ()=>{console.log(`mongo disconnected`)})





// MIDDLEWARE

app.use((req, res, next) => {
  console.log('HELLO, I am custom middleware, every request passes through me')
  console.log("Think: like a bouncer at a club")
  console.log("Here is req", req.body)
  next() // this sends the request on to the next step in the process
})
// set up static assets (images/css/client-side JS/etc)
app.use(express.static('public'))
// this will parse the data and create the "req.body" object
app.use(express.urlencoded({extended: true}));

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

// SET UP CREATE ROUTE
	// this route will allow us to push the new college into the list!
app.post('/colleges', (req, res)=>{
	console.log(req.body)
	colleges.push(req.body)
	res.redirect('/colleges')
})


// SET UP DELETE ROUTE
// app.delete('/colleges/:indexOfCollegesArray', (req, res)=>{
// 	colleges.findByIdAndRemove(req.params.indexOfCollegesArray, (err, data)=>{
// 		if (err) {
// 			console.log(err)
// 		} else {
// 			console.log(data)
// 			res.redirect('/colleges')
// 		}
// 	})
// 	//res.redirect('/colleges')
// })



























app.listen(3000, ()=>{
	console.log(`server is listening!`)
})