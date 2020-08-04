const express = require('express');
const router = express.Router();
const { User, validate } = require('../Models/User');

router.get('/login', (req, res) => {
    res.render("login");
});

router.get('/register', (req, res) => {
    res.render("register");
});

router.post('/register', (req, res) => {
    const { name, email, password, password2 } = req.body;
    const { error } = validate(req.body);
    if (error) {
        const errors = error;
        return res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        });
    }
    // if (validation) {
    //     const errors = validation.details[0].message;
    //     return 
    // } else {
    //     res.send('pass');
    // }
});

module.exports = router;