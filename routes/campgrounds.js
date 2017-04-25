var express = require('express')
var router = express.Router();
var Campground = require('../models/campground')

// Index Route- Show all campgrounds
router.get('/', function (req, res) {
    Campground.find({}, function (err, allcampgrounds) {
        if (err) {
            console.log('Error Occurred')
        } else {
            res.render('campgrounds/index', {campgrounds: allcampgrounds})
        }
    })
})

// Create Route - Add new campground to DB
router.post('/', function (req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampground = {
        name: name,
        image: image,
        description:description
    }
    Campground.create(newCampground, function (err, item) {
        if (err) {
            console.log(err)
        } else {
            res.redirect('/campgrounds')
        }
    })
})

// New - Show from to create new route
router.get('/new', function (req, res) {
    res.render('campgrounds/new')
})
// Show Route
router.get('/:id', function (req, res) {
    Campground.findById(req.params.id).populate('comments').exec(function(err, foundCamp) {
        if (err) {
            console.log(err)
        } else {
            console.log(foundCamp)
            res.render('campgrounds/show', {campground:foundCamp})
        }
    })
})


module.exports = router