const mongoose = require('mongoose');
const Campground = require('./models/campground');
const Comment = require('./models/comment')

const data = [
    {
        name: "cloud's Rest",
        image: "https://",
        description: "its just a name oo",
        contentType: "image/jpeg"
    },
    {
        name: "Moon Rest",
        image: "https://",
        description: "its just a name oohih",
        contentType: "image/jpeg"
    },
    
    {
        name: "Son Rest",
        image: "https://",
        description: "its just a name oo",
        contentType: "image/jpeg"
    }
]

const seedDB = () => {
    //remove all campgrounds
    Campground.remove({}, (err) => {
        if(err){
            console.log(err)
        }
        console.log("removed campgrounds!")
        //create a new campground
    data.forEach((seed) => {
        Campground.create(seed, (err, campground) => {
            if(err){
                console.log(err)
            }  {
                console.log("added a campground")
                //create a comment 
                Comment.create(
                    { 
                        text: "this place is great but i wish there was internet",
                        author: "homer" 
                    }, (err, comment) => {
                        if(err) {
                            console.log("comment err", err)
                        } else {
                            campground.comments.push(comment)
                            campground.save()
                            console.log("Created a comment")
                        }
                    });
            }
        })
    })
      
    })

    

}
 module.exports = seedDB
