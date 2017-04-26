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
// var seedDB = require('./seeds')
var flash = require('connect-flash')
var methodOverride = require('method-override')

// Requiring Routes
var campgroundRoutes = require('./routes/campgrounds')
var commentRoutes = require('./routes/comments')
var indexRoutes = require('./routes/index')

mongoose.connect('mongodb://localhost/yelp_camp')
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(__dirname + '/public'))
app.set('view engine', 'ejs')
app.use(methodOverride('_method'))
app.use(cookieParser('secret'));
app.use(flash())

// Seed Database
//seedDB();

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
// var campgrounds = [
//     {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"},
//     {name: "Granite Hill", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"},
//     {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg"},
//     {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"},
//     {name: "Granite Hill", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"},
//     {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg"},
//     {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"},
//     {name: "Granite Hill", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"},
//     {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg"}
// ];


app.listen(3000, function () {
    console.log('Server is running on port 3000')
});