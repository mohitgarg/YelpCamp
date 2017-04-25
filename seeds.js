var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment   = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest",
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tristique velit quis bibendum laoreet. Donec quis eros id nisl facilisis vulputate. Ut pulvinar nunc tortor, sed dapibus nulla faucibus non. Aenean tellus lectus, dapibus sed tincidunt maximus, pellentesque a turpis. Proin eget malesuada orci, a suscipit leo. Donec cursus condimentum arcu in congue. Nulla eleifend et libero vitae commodo. Nunc sed sagittis tortor, sit amet pellentesque est. Morbi ut lorem felis. Nullam vitae fermentum purus, in varius urna. Nunc molestie lacus eget felis iaculis cursus. Vestibulum congue posuere nunc, vitae rutrum sem sodales a. Integer sodales finibus velit ut blandit. Morbi elementum dictum placerat. Duis placerat leo tempus nulla ultrices condimentum non at turpis."
    },
    {
        name: "Desert Mesa",
        image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tristique velit quis bibendum laoreet. Donec quis eros id nisl facilisis vulputate. Ut pulvinar nunc tortor, sed dapibus nulla faucibus non. Aenean tellus lectus, dapibus sed tincidunt maximus, pellentesque a turpis. Proin eget malesuada orci, a suscipit leo. Donec cursus condimentum arcu in congue. Nulla eleifend et libero vitae commodo. Nunc sed sagittis tortor, sit amet pellentesque est. Morbi ut lorem felis. Nullam vitae fermentum purus, in varius urna. Nunc molestie lacus eget felis iaculis cursus. Vestibulum congue posuere nunc, vitae rutrum sem sodales a. Integer sodales finibus velit ut blandit. Morbi elementum dictum placerat. Duis placerat leo tempus nulla ultrices condimentum non at turpis."
    },
    {
        name: "Canyon Floor",
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tristique velit quis bibendum laoreet. Donec quis eros id nisl facilisis vulputate. Ut pulvinar nunc tortor, sed dapibus nulla faucibus non. Aenean tellus lectus, dapibus sed tincidunt maximus, pellentesque a turpis. Proin eget malesuada orci, a suscipit leo. Donec cursus condimentum arcu in congue. Nulla eleifend et libero vitae commodo. Nunc sed sagittis tortor, sit amet pellentesque est. Morbi ut lorem felis. Nullam vitae fermentum purus, in varius urna. Nunc molestie lacus eget felis iaculis cursus. Vestibulum congue posuere nunc, vitae rutrum sem sodales a. Integer sodales finibus velit ut blandit. Morbi elementum dictum placerat. Duis placerat leo tempus nulla ultrices condimentum non at turpis."
    }
]

function seedDB(){
    //Remove all campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
        //add a few campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err)
                } else {
                    console.log("added a campground");
                    //create a comment
                    Comment.create(
                      {
                          text: "This place is great, but I wish there was internet",
                          author: "Homer"
                      }, function(err, comment){
                          if(err){
                              console.log('Can not create a comment'+err);
                          } else {
                              campground.comments.push(comment);
                              campground.save();
                              console.log("Created new comment");
                          }
                      });
                }
            });
        });
    });
    //add a few comments
}

module.exports = seedDB;
