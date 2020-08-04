const express = require('express');
const router = express.Router();
const { User, validate } = require('../Models/User');
const bcrypt = require('bcryptjs');

router.get('/login', (req, res) => {
    res.render("login");
});

router.get('/register', (req, res) => {
    res.render("register");
});

router.post('/register', async(req, res) => {
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
    } else {
        await User.findOne({ email: email })
            .then(async(user) => {
                const errors = 'Email has already been registered!'
                if (user) {
                    return res.render('register', {
                        errors,
                        name,
                        email,
                        password,
                        password2
                    });
                } else {
                    const user = new User({
                        name,
                        email,
                        password
                    });

                    await bcrypt.genSalt(10, (err, salt) => bcrypt.hash(
                        user.password, salt, async(err, hash) => {
                            if (err) throw err;
                            user.password = hash;
                            await user.save()
                                .then(user => {
                                    req.flash('sukses', 'You are now registered!');
                                    res.redirect('/users/login');
                                })
                                .catch(err => console.error(err));
                        }
                    ));
                }
            })
            .catch(err => console.error(err));
    }
});

module.exports = router;