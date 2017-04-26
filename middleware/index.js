var Campground = require('../models/campground')
var Comment = require('../models/comment')
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function checkCampgroundOwnership(req, res, next) {
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, function (err, foundCampground) {
            if (err) {
                res.redirect('back')
            } else {
                console.log(typeof foundCampground.author.id) // Both Seems to be the same but this is an Object
                console.log(typeof req.user.id) // And this is a string
                if (foundCampground.author.id.equals(req.user.id)) {
                    next()
                } else {
                    req.flash('error', 'You don\'t have the permission to do that')
                    res.redirect('back')
                }
            }
        })
    } else {
        req.flash('error','You need to be logged in for this action!')
        res.redirect('back')
    }
}

middlewareObj.checkCommentOwnership = function checkCommentOwnership(req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function (err, foundComment) {
            if (err) {
                req.flash('error', 'Campground not found!')
                res.redirect('back')
            } else {
                if (foundComment.author.id.equals(req.user.id)) {
                    next()
                } else {
                    req.flash('error', 'You don\'t have the permission to do that')
                    res.redirect('back')
                }
            }
        })
    } else {
        req.flash('error','You need to be logged in for this action!')
        res.redirect('back')
    }
}

middlewareObj.isLoggedIn = function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        req.flash('error', 'You need to be logged in for this action!')
        res.redirect('/login')
    }
}

module.exports = middlewareObj;