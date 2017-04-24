var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/test')

var postSchema = new mongoose.Schema({
    title:String,
    comment:String
})

var Post = mongoose.model('Post', postSchema)

var userSchema = new mongoose.Schema({
    name:String,
    email:String,
    post:[postSchema]
})
var User = mongoose.model('User', userSchema)

// var Jane = new User({
//     name:'Jane Doe',
//     email:'janedoe@gmail.com'
// })
// Jane.post.push({
//     title:'This is Jane',
//     comment:'This comment is related'
// })
// Jane.save(function (err, user) {
//     if(err){
//         console.log(err)
//     } else {
//         console.log(user)
//     }
// })

// var newPost = new Post({
//     title:'Hello Post',
//     comment:'This is an awesome title'
// })
//
// newPost.save(function (err,post) {
//     if(err){
//         console.log(err)
//     } else {
//         console.log(post)
//     }
// })

User.findOne({name:'Jane Doe'}, function (err, user) {
    if(err){
        console.log(err)
    } else {
        user.post.push({
            title:'Hello Callback Title',
            comment:'I am writing out way to many comments'
        })
        user.save(function (err, user) {
            if(err){
                console.log(err)
            } else {
                console.log(user)
            }
        })
    }
})