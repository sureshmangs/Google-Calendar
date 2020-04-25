const passport = require("passport")
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const GoogleStrategy = require('passport-google-token').Strategy;

const { JWT_SECRET, CLIENT_ID, CLIENT_SECRET } = require('./configs/keys');
const User = require('./models/user');


// JSON Web Token Strategy
passport.use('jwt', new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: JWT_SECRET
}, async (payload, done) => {
    try {
        //console.log('payload is ', payload)
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
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    scope: ['openid', 'email', 'https://www.googleapis.com/auth/calendar']
}, async (accessToken, refreshToken, profile, done) => {
    try {
        // Should have full user profile over here
        // console.log('profile', profile.name);
        // console.log('accessToken', accessToken);
        // console.log('refreshToken', refreshToken);

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