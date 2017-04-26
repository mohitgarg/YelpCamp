var express = require('express')
var router = express.Router();
var Campground = require('../models/campground')
var middleware = require('../middleware')

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
router.post('/', middleware.isLoggedIn, function (req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {
        name: name,
        image: image,
        description: description,
        author: author
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
router.get('/new', middleware.isLoggedIn, function (req, res) {
    res.render('campgrounds/new')
})
// Show Route
router.get('/:id', function (req, res) {
    Campground.findById(req.params.id).populate('comments').exec(function (err, foundCamp) {
        if (err) {
            console.log(err)
        } else {
            console.log(foundCamp)
            res.render('campgrounds/show', {campground: foundCamp})
        }
    })
})
//Edit Campground
router.get('/:id/edit',middleware.checkCampgroundOwnership,function (req, res) {
        Campground.findById(req.params.id, function (err, foundCampground) {
            if (err) {
                res.redirect('/campgrounds')
            } else {
                res.render('campgrounds/edit', {campground: foundCampground})
            }
        })

})
//Update Campground
router.put('/:id', middleware.checkCampgroundOwnership,function (req, res) {
    Campground.findByIdAndUpdate(req.params.id, req.body.updatedData, function (err, updatedCampground) {
        if (err) {
            res.redirect('/campgrounds')
        } else {
            res.redirect('/campgrounds/' + req.params.id)
        }
    })
})
// Delete Campground
router.delete('/:id',middleware.checkCampgroundOwnership,function (req, res) {
    Campground.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.redirect('/campgrounds')
        } else {
            res.redirect('/campgrounds')
        }
    })
})


module.exports = router