const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const {User} = require('../Models/User');

module.exports = function(passport){
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
            //match user
            await User.findOne({ email: email })
                .then(async (user) => {
                    if(!user){
                        return done(null, false, { message: 'Email has not been registered!' }); //null for the error, false for the user (user not found)
                    }
                    await bcrypt.compare(password, user.password, (err, isMatch) => { //password rever to line 8, user.password rever to database (line 10 then check line 11)
                        if(err) throw err;
                        if(isMatch){
                            return done(null, user)
                        } else{ //if the password didn't match
                            return done(null, false, { message: 'Password Incorect!' });
                        }
                    });

                })
                .catch(err => console.error(err));
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
      
    passport.deserializeUser( async (id, done) => {
        await User.findById(id, (err, user) => {
            done(err, user);
        });
    });
}