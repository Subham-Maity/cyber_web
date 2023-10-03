import passport from 'passport'
import { Strategy as LinkedInStrategy } from 'passport-linkedin-oauth2';
import dotenv from 'dotenv';
dotenv.config()

passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj as any);
});

passport.use(new LinkedInStrategy({
    clientID: process.env.CLIENT_ID || "",
    clientSecret: process.env.CLIENT_SECRET || "",
    callbackURL: process.env.CALLBACK_URL || "",
    scope: ['openid', 'profile', 'email'],
}, function (token, tokenSecret, profile, done) {
    return done(null, profile);

}));

export default passport
