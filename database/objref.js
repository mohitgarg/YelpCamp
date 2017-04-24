var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/obj')

var postSchema = new mongoose.Schema({
    title:String,
    comment:String
})

var Post = mongoose.model('Post', postSchema)

var userSchema = new mongoose.Schema({
    name:String,
    email:String,
    post:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
    }]
})
var User = mongoose.model('User', userSchema)

// User.create({
//     name:'Colt Steele',
//     email:'colt@gmail.com'
// })

// Post.create({
//     title:'Object reference Updated',
//     comment:'This comment is lamest'
// }, function (err,post) {
//     User.findOne({email:'colt@gmail.com'}, function (err, foundUser) {
//         if(err){
//             console.log(err)
//         } else {
//             foundUser.post.push(post)
//             foundUser.save(function (err, user) {
//                 if(err){
//                     console.log(err)
//                 } else {
//                     console.log(user)
//                 }
//             })
//         }
//     })
// })

User.findOne({email:'colt@gmail.com'}).populate('posts').exec(function (err,user) {
    if (!err) {
        console.log(user)
    } else {
        console.log(err)
    }
})