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
			programsOfInterest: 'Sociology',
			hasApplied: false,
			hasBeenAccepted: false
		},
		{
			name:'Spelman College',
			location: 'Atlanta, GA',
			cost: '$90,000',
			programsOfInterest: 'Psychology',
			hasApplied: false,
			hasBeenAccepted: false
		}, 
		{
			name:'Howard University',
			location: 'Washington D.C.',
			cost: '$90,000',
			programsOfInterest: 'Psychology',
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


// COLLEGES SHOW ROUTE

router.get('/:id', (req, res)=> {
	Colleges.findById(req.params.id, (err, foundCollege)=>{
		res.render('show.ejs', {college: foundCollege})
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

	Colleges.create(req.body, (error, createdCollege) =>{
		if (error) {
			console.log(error)
			res.send(error)
		} else {
			console.log(createdCollege)
			res.redirect('/colleges')
		}
	})
})


// SET UP DELETE ROUTE
router.delete('/:id', (req, res)=>{
	Colleges.findByIdAndRemove(req.params.id, (err, data)=>{
		if (err) {
			console.log(err)
		} else {
			//console.log(data)
			res.redirect('/colleges')
		}
	})
	//res.redirect('/colleges')
})


// EDIT ROUTE
router.get('/:id/edit', (req,res)=>{
	Colleges.findById(req.params.id, (err, foundCollege)=>{
		res.render('edit.ejs', {
			college: foundCollege,
		})
	})
})

// UPDATE ROUTE

router.put('/:id', (req, res)=> {
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
	Colleges.findByIdAndUpdate(
		req.params.id, 
		req.body, 
		{new: true}, 
		(err, updatedCollege)=>{
		res.redirect('/colleges')
	})
})


module.exports = router



















