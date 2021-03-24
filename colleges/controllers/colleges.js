const express = require('express')
const router = express.Router()

// REQUIRE COLLEGES MODEL

const Colleges = require('../models/colleges')

router.get('/', (req, res)=> {

	Colleges.find({}, (err, foundColleges, next) => {
		if (err) {
			console.log(err)
			next(err)
		} else {
			res.render('index.ejs', {colleges: foundColleges})
		}
	})
})

// NEW ROUTE

router.get('/new', (req, res)=>{
	res.render('new.ejs')
})

// SEED ROUTE

router.get('/seed', (req, res)=> {
	Colleges.create([
		{
			name:'Clark Atlanta University',
			location: 'Atlanta, GA',
			cost: '$70,000',
			programsOfInterest: ['Psychology','Sociology'],
			hasApplied: false,
			hasBeenAccepted: false
		},
		{
			name:'Spelman College',
			location: 'Atlanta, GA',
			cost: '$90,000',
			programsOfInterest: ['Psychology','Sociology'],
			hasApplied: false,
			hasBeenAccepted: false
		}, 
		{
			name:'Howard University',
			location: 'Washington D.C.',
			cost: '$90,000',
			programsOfInterest: ['Psychology','Sociology'],
			hasApplied: false,
			hasBeenAccepted: false
		} 

	], (err, data)=>{
		if (err) {
			console.log(err)
		}
		res.redirect('/colleges')
	})
})


// FRUITS SHOW ROUTE

router.get('/indexOfCollegesArray', (req, res)=> {
	Colleges.findById(req.params.indexOfCollegesArray, (err, foundColleges)=>{
		res.render('show.ejs', {college: foundColleges})
	})
})


// POST ROUTE

router.post('/', (req, res) => {
	if (req.body.hasApplied === "on") {
		req.body.hasApplied = true
	} else {
		req.body.hasApplied = false
	}

	if (req.body.hasBeenAccepted === "on") {
		req.body.hasBeenAccepted = true
	} else {
		req.body.hasBeenAccepted = false
	}

	Colleges.create(req.body, (error, createdColleges) =>{
		if (error) {
			console.log(error)
			res.send(error)
		} else {
			console.log(createdColleges)
			res.redirect('/colleges')
		}
	})
})


// SET UP DELETE ROUTE
app.delete('/colleges/:indexOfCollegesArray', (req, res)=>{
	Colleges.findByIdAndRemove(req.params.indexOfCollegesArray, (err, data)=>{
		if (err) {
			console.log(err)
		} else {
			console.log(data)
			res.redirect('/colleges')
		}
	})
	//res.redirect('/colleges')
})


// EDIT ROUTE
router.get('/indexOfCollegesArray/edit', (req,res)=>{
	Colleges.findById(req.params.indexOfCollegesArray, (err, foundColleges)=>{
		res.render('edit.ejs', {
			colleges: foundColleges
		})
	})
})

// UPDATE ROUTE

router.put('/indexOfCollegesArray', (req, res)=> {
	if (req.body.hasApplied === "on") {
		req.body.hasApplied = true
	} else {
		req.body.hasApplied = false
	}

	if (req.body.hasBeenAccepted === "on") {
		req.body.hasBeenAccepted = true
	} else {
		req.body.hasBeenAccepted = false
	}
	Colleges.findByIdAndUpdate(req.params.indexOfCollegesArray, req.body, {new: true}, (err, updatedColleges)=>{
		res.redirect('/colleges')
	})
})


module.exports = router



















