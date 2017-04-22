var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Campground = require('./models/campground')
var seedDB = require('./seeds')

seedDB();
mongoose.connect('mongodb://localhost/yelp_camp')
app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')

// Campground.create({
//     name:'Night Into Day',
//     image:'https://c1.staticflickr.com/8/7318/8719942355_81af676006_z.jpg',
//     description:'A beautiful campground on a beautiful mountain hill'
// }, function (err, item) {
//     if(err){
//         console.log(err)
//     } else {
//         console.log(item)
//     }
// })

var campgrounds = [
    {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"},
    {name: "Granite Hill", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"},
    {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg"},
    {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"},
    {name: "Granite Hill", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"},
    {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg"},
    {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"},
    {name: "Granite Hill", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"},
    {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg"}
];
// campgrounds.map(function (item) {
//     Campground.create({
//         name: item.name,
//         image: item.image
//     }, function (err, data) {
//         if (err) {
//             console.log(err)
//         } else {
//             console.log(data)
//         }
//     })
// })

app.get('/', function (req, res) {
    res.render('landing')
});
app.get('/campgrounds', function (req, res) {
    Campground.find({}, function (err, allcampgrounds) {
        if (err) {
            console.log('Error Occurred')
        } else {
            res.render('index', {campgrounds: allcampgrounds})
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
    res.render('new')
})

app.get('/campgrounds/:id', function (req, res) {
    Campground.findById(req.params.id, function (err, foundCamp) {
        if (err) {
            console.log(err)
        } else {
            res.render('show', {campground:foundCamp})
        }
    })
})
app.listen(3000, function () {
    console.log('Server is running on port 3000')
});