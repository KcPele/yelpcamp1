const express = require('express')
const router = express.Router();
const User = require('../models/user')
const passport = require('passport')






router.get('/', (req, res) => {
    res.render('landing')
});


//auth routes
router.get('/register', (req, res) => {
    res.render('users/register')
 });
 
 router.post('/register', (req, res) => {
    
       
     User.register( new User({ username: req.body.username}), req.body.password, (err, user) => {
         if(err){
             req.flash('error', err.message)
            return res.redirect('/register')
         } 
         passport.authenticate('local')(req, res, () => {
            req.flash('success', 'Welcome to Yelpcamp' + ' ' + user.username)
             res.redirect('/campgrounds')
         })
     })
 
 });
 
 router.get('/login', (req, res) => {
 return 	res.render('users/login')
 });
 
 router.post('/login', passport.authenticate('local', {

     successRedirect: '/campgrounds',
     failureRedirect: '/login'
 }), (req, res) => {
    
 });
 
 router.get('/logout', (req, res) => {
       req.logOut()
       req.flash('success', 'Logged You Out')
       res.redirect('/campgrounds')
 });
 
 module.exports = router