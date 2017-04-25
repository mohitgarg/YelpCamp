var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport')
var LocalStrategy = require('passport-local')
var Campground = require('./models/campground')
var Comment = require('./models/comment')
var User = require('./models/user')
var seedDB = require('./seeds')

mongoose.connect('mongodb://localhost/yelp_camp')
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(__dirname + '/public'))
app.set('view engine', 'ejs')
seedDB();

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
    next()
})

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


app.get('/', function (req, res) {
    res.render('landing')
});
app.get('/campgrounds', function (req, res) {
    Campground.find({}, function (err, allcampgrounds) {
        if (err) {
            console.log('Error Occurred')
        } else {
            res.render('campgrounds/index', {campgrounds: allcampgrounds})
        }
    })
})

app.post('/campgrounds', function (req, res) {
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

app.get('/campgrounds/new', function (req, res) {
    res.render('campgrounds/new')
})
// Show Route
app.get('/campgrounds/:id', function (req, res) {
    Campground.findById(req.params.id).populate('comments').exec(function(err, foundCamp) {
        if (err) {
            console.log(err)
        } else {
            console.log(foundCamp)
            res.render('campgrounds/show', {campground:foundCamp})
        }
    })
})

// ========= Comment Routes ======
app.get('/campgrounds/:id/comments/new',isLoggedIn, function (req, res) {
    //find campground by ID
    Campground.findById(req.params.id, function (err, campground) {
        if(err){
            console.log(err)
        } else {
            res.render('comments/new', {campground:campground})
        }
    })
})

app.post('/campgrounds/:id/comments',isLoggedIn,function (req, res) {
    Campground.findById(req.params.id, function (err, campground) {
        if(err){
            console.log(err)
            res.redirect('/campgrounds')
        } else {
            Comment.create(req.body.comment, function (err, comment) {
                if(err){
                    console.log(err)
                } else {
                    campground.comments.push(comment)
                    campground.save();
                    res.redirect('/campgrounds/'+ campground._id)
                }
            })
        }
    })
})

// ==== Auth Routes =====

app.get('/register', function (req, res) {
    res.render('register')
})
// === Register User===
app.post('/register', function (req, res) {
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
app.get('/login', function (req, res) {
    res.render('login')
})
app.post('/login',passport.authenticate('local',{
   successRedirect:'/campgrounds',
    failureRedirect:'/login'

}),function (req, res) {
})

//=== Logout ===
app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/campgrounds')
})

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    } else {
        res.redirect('/login')
    }
}
app.listen(3000, function () {
    console.log('Server is running on port 3000')
});