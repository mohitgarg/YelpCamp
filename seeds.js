var mongoose = require('mongoose')
var Campground = require('./models/campground')
var Comment = require('./models/comment')

var data = [
    {
        name: "Cloud's Rest",
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "blah blah blah"
    },
    {
        name: "Desert Mesa",
        image: "https://farm4.staticflickr.com/3859/15123592300_6eecab209b.jpg",
        description: "blah blah blah"
    },
    {
        name: "Canyon Floor",
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "blah blah blah"
    }
]

function seedDB() {
    // Remove all Campgrounds
    Campground.remove({}, function (err) {
        if (err) {
            console.log(err)
        }
        console.log('Campgrounds Removed')
        data.forEach(function (item) {
            Campground.create(item,function (err, camp) {
                if(err){
                    console.log(err)
                } else {
                    console.log(camp)
                    Comment.create({
                        text:'I wish we had internet in this place',
                        author:'John Doe'
                    }, function (err, comment) {
                        if(err){
                            console.log(err)
                        }else {
                            camp.comment.push(comment)
                            camp.save();
                            console.log('New Comment Created')
                        }
                    })
                }
            })
        })
    })
}

module.exports = seedDB;