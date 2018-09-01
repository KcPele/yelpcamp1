const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const seedDB = require('./seeds');
const methodOverride = require('method-override')
const User = require('./models/user')
const passport = require('passport')
const localStrategy = require('passport-local')
const expressSession = require('express-session');
const cookieParser = require("cookie-parser")
const flash        = require("connect-flash")
const app = express()


const commentRoutes = require('./routes/comments')
const campgroundsRoute = require('./routes/campgrounds')
const indexRoutes = require('./routes/index')



mongoose.connect(
'mongodb://localhost/yelpcampV1', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});
mongoose.connection.once('open', () => {
    console.log('connected to db')
})

//seed data base
//seedDB();

app.use(expressSession({
    secret: "This is a yelpcamp auths for shore",
    resave: false,
   saveUninitialized: false
}))
app.set('view engine', 'ejs')
app.use(express.static(__dirname + "/public"))
app.use(bodyParser.urlencoded({ extended: true}));
app.use(methodOverride("_method"));
app.use(flash())
app.use(cookieParser('secret'));
//auth
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())


app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success')
    next()
})
 app.use("/",indexRoutes)
 app.use("/campgrounds/:id/comments", commentRoutes);
 app.use("/campgrounds", campgroundsRoute)

 
app.listen(4000, () => {
    console.log(`Server started on 4000`);
});