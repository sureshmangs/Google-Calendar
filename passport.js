const passport = require("passport")
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const GoogleStrategy = require('passport-google-token').Strategy;
const dotenv = require('dotenv');
const User = require('./models/user');

dotenv.config();

// JSON Web Token Strategy
passport.use('jwt', new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: process.env.JWT_SECRET
}, async (payload, done) => {
    try {
        //find the user specified in the token
        const user = await User.findById(payload.sub);

        // if user doesn't exist handle the scenario
        if (!user) {
            return done(null, false);
        }

        // otherwise return the user
        done(null, user);

    } catch (error) {
        done(null, false);
    }
}));





// Google OAuth Strategy
passport.use('googleToken', new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    scope: ['openid', 'email', 'https://www.googleapis.com/auth/calendar']
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const existingUser = await User.findOne({ "google.id": profile.id });
        if (existingUser) {
            console.log('user already exist')
            return done(null, existingUser);
        }

        console.log('creating a new user')
        const newUser = new User({
            method: 'google',
            google: {
                id: profile.id,
                email: profile.emails[0].value
            }
        });

        await newUser.save();
        done(null, newUser);
    } catch (error) {
        done(error, false, error.message);
    }
}));