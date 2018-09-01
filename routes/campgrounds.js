const express = require('express')
const router = express.Router();

const Campground = require('../models/campground')
const upload = require('../storage/upload') 
const fs = require('fs')
const middleware = require('../middleware/index')




router.get('/', (req, res) => {
    Campground.find({}, (err, allCampground) => {
        if(err) {
            res.redirect('/campground')
        } else{
        res.render('campgrounds/index', {campgrounds: allCampground})
        }
    })
   });

router.get('/new',middleware.isLoggedIn, (req, res) => {
    res.render('campgrounds/new')
});

router.post('/',middleware.isLoggedIn, upload.single('myImage'), (req, res) => {
    const filePath = req.file
    if(!filePath) return  res.redirect('/campgrounds')

    const img = fs.readFileSync(req.file.path)
    const encode_image = img.toString('base64')
    const name = req.body.name
    const description = req.body.description
    const contentType = req.file.mimetype
    const author  = {
        id: req.user._id,
        username: req.user.username
    }
    const newCampground = { 
        name: name, 
        image: encode_image, 
        description: description, 
        contentType: contentType,
        author: author
      }
     
    Campground.create(newCampground, (err, newlyCreated) => {
          if(err){
              console.log(err)
              res.redirect('/campgrounds/new')
          } else {
              // sends us back to campgreounds page
            return 	res.redirect('/campgrounds')
          }
    })


});

//show page
router.get('/:id', (req, res) => {
     Campground.findById(req.params.id).populate("comments").exec( (err, foundCampground) => {
              if(err) {
                  res.redirect('/campground')
              } else {
                  res.render('campgrounds/show', {campground: foundCampground})
              }
     })
});


//edith campground route
router.get('/:id/edit',middleware.checkCampgroundOwnership, (req, res) => {
        Campground.findById(req.params.id, (err, foundCampground) => {
                 res.render('campgrounds/edit', {campground: foundCampground})

        })
});

//update campground route

router.put('/:id',middleware.checkCampgroundOwnership, upload.single('myImage'), (req, res) => {
    const filePath = req.file
    const name = req.body.name
    const description = req.body.description
    if(!filePath) {
        
    const newCampground = { 
         name: name, 
         description: description, 
         }
       Campground.findOneAndUpdate(req.params.id, newCampground, (err, updatedCampground) => {
           if(err) {
               res.redirect('/campgrounds')
           } else {
               res.redirect('/campgrounds/' + req.params.id)
           }
       })

    } else {
  
     const img = fs.readFileSync(req.file.path)
    const encode_image = img.toString('base64')
   const contentType = req.file.mimetype
  
    const newCampground = { 
        name: name, 
        image: encode_image, 
        description: description, 
        contentType: contentType
      }
      Campground.findByIdAndUpdate(req.params.id, newCampground, (err, updatedCampground) => {
          if(err) {
              res.redirect('/campgrounds')
          } else {
              res.redirect('/campgrounds/' + req.params.id)
          }
      })
            
    }
});
 
//Destroy route
router.delete('/:id',middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findByIdAndRemove(req.params.id, (err) => {
        if(err){
            res.redirect('/campgrounds')
        } else{
            res.redirect('/campgrounds')
        }
    })	

});


module.exports = router