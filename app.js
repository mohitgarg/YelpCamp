var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport')
var cookieParser = require('cookie-parser')
var LocalStrategy = require('passport-local')
// var Campground = require('./models/campground')
// var Comment = require('./models/comment')
var User = require('./models/user')
var seedDB = require('./seeds')
var flash = require('connect-flash')
var methodOverride = require('method-override')

// Requiring Routes
var campgroundRoutes = require('./routes/campgrounds')
var commentRoutes = require('./routes/comments')
var indexRoutes = require('./routes/index')

mongoose.connect('mongodb://mohit:password@ds011725.mlab.com:11725/yelpcamp_mohit')
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(__dirname + '/public'))
app.set('view engine', 'ejs')
app.use(methodOverride('_method'))
app.use(cookieParser('secret'));
app.use(flash())

// Seed Database
// seedDB();

//Passport Configuration
app.use(require('express-session')({
    secret:'I am the best',
    resave: false,
    saveUninitialized:false
}))
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use(function (req, res, next) {
    res.locals.currentUser = req.user
    res.locals.error = req.flash('error')
    res.locals.success = req.flash('success')
    next()
})

// Using Routes
app.use(indexRoutes)
app.use('/campgrounds/:id/comments',commentRoutes)
app.use('/campgrounds',campgroundRoutes)

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp Server Has Started!");
});