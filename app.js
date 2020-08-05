const mongoose = require('mongoose');
const db = require('./Config/keys').MongoUrl;
const express = require('express');
const expressEjsLayouts = require('express-ejs-layouts');
const app = express();
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
require('./Config/passport')(passport); //passing passport check pasport.js line 6

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected!'))
    .catch(err => console.log(err));

app.use(expressEjsLayouts);
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
//express session middlware
app.use(session({
    secret: 'secret_key',
    resave: true,
    saveUninitialized: true
}));

//have to put this after the express session middleware
//pasport middleware
app.use(passport.initialize());
app.use(passport.session());
//
//connect flash
app.use(flash());
//global var
app.use((req, res, next) => {
    res.locals.sukses = req.flash('sukses');//when register is success
    res.locals.gagal = req.flash('gagal');//when register is failed
    res.locals.error_login = req.flash('error');//when login is failed
    next();
});

app.use('/', require('./Routes/index'));
app.use('/users', require('./Routes/users'));

const port = 5000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});