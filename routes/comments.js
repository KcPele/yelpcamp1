
const express = require('express')
const router = express.Router({mergeParams: true});
const Comment = require('../models/comment')
const Campground = require('../models/campground')
const middleware = require('../middleware/index')



//comments routes
router.get('/new',middleware.isLoggedIn, (req, res) => {
    Campground.findById( req.params.id, (err, foundCampground) => {
        if(err) {
            console.log(err)
        } else {
            res.render('comments/new', {campground: foundCampground})

        }
    })
  
});

router.post('/',middleware.isLoggedIn, (req, res) => {
    //lookup campground by id
    const id = req.params.id
    const commentsFromForm = req.body.comment
    Campground.findById(id, (err, campground) => {
        if(err) {
            console.log(err)
        } else {
            Comment.create(commentsFromForm, (err, createdComment) => {
               if(err) {
                req.flash('error', 'Something went wrong')
                   console.log("comment err", err)
               } else {
                   createdComment.author.id = req.user._id;
                   createdComment.author.username = req.user.username;
                   createdComment.save()
                campground.comments.push(createdComment)
                campground.save()
                req.flash('success', 'Successfully created a comment. Thank You')
                res.redirect('/campgrounds/' + id)
               }
            })
           
        }
    })
});

//edit comment
router.get('/:comment_id/edit',middleware.checkCommentOwnership, (req, res) => {
  Comment.findById(req.params.comment_id, (err, foundComment) => {
      if(err){
        res.redirect('back')
      } else {
    	res.render('comments/edit', {campground_id: req.params.id, comment: foundComment})
      }
  })
});


router.put('/:comment_id',middleware.checkCommentOwnership, (req, res) => {
      Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment) => {
          if(err){
              res.redirect('back')
          } else{
              res.redirect('/campgrounds/' + req.params.id)
          }
      })
});

//comments destroy routess

router.delete('/:comment_id',middleware.checkCommentOwnership, (req, res) => {
         Comment.findByIdAndRemove(req.params.comment_id, (err) => {
             if(err) {
                 res.redirect('back')
             } else {
                req.flash('success', 'Comment deleted')
                 res.redirect('/campgrounds/' + req.params.id)
             }
         })
});

module.exports = router

