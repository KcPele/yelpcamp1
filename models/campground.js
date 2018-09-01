
const mongoose = require('mongoose');
const Comment = require('./comment')

const campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    contentType: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    } 
]
    
})

const Campground = mongoose.model('Campground', campgroundSchema)

module.exports = Campground