var express = require('express')
var router = express.Router();
var passport = require('passport')
var User = require('../models/user')

// Root Route
router.get('/', function (req, res) {
    res.render('landing')
});

// Register Form
router.get('/register', function (req, res) {
    res.render('register')
})
// === Register User===
router.post('/register', function (req, res) {
    User.register(new User({username: req.body.username}), req.body.password,function (err, user) {
        if(err) {
            console.log(err)
            return res.render('/register')
        } else {
            passport.authenticate('local')(req, res, function () {
                res.redirect('/campgrounds')
            })
        }
    })
})
// === Show Login Forum===
router.get('/login', function (req, res) {
    res.render('login')
})
router.post('/login',passport.authenticate('local',{
    successRedirect:'/campgrounds',
    failureRedirect:'/login'

}),function (req, res) {
})

//=== Logout ===
router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/campgrounds')
})

// Middleware
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    } else {
        res.redirect('/login')
    }
}

module.exports = router