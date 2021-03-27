const express = require('express');
const app = express();

// REQUIRED!!!!!

const collegeControllers = require('./controllers/colleges')
// const colleges = require('./models/colleges.js')
// console.log(colleges)

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

  console.log("Here is req", req.body)
  next() // this sends the request on to the next step in the process
})

app.use('/colleges', collegeControllers)

























app.listen(3000, ()=>{
	console.log(`server is listening!`)
})