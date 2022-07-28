import passport from 'passport'
import JwtStrategy, { ExtractJwt } from 'passport-jwt'
import { Strategy } from 'passport-google-oauth20'
import userService from '../services/userService'
import User from '../models/User'
require('dotenv').config()

export const jwtStrategy = new JwtStrategy.Strategy(
    { jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), secretOrKey: `${process.env.JWT_SECRET}` }, (jwt_payload, done) => {
        const user = jwt_payload
        done(null, user)
    }
)

export const googleStrategy = new Strategy(
    {
        clientID: `${process.env.GOOGLE_CLIENT_ID}`,
        clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
        callbackURL: "/users/auth"
    },
    async function (accessToken, refreshToken, profile, cb) {
        //check if user exists in database
        const email = profile.emails ? profile.emails[0].value : ''
        let user = await userService.getUserByEmail(email)
        if (user) {
            return cb(null, user)
        } else {
            const newUser = new User({
                firstname: profile.name?.givenName,
                lastname: profile.name?.familyName,
                email: profile.emails ? profile.emails[0].value : '',
                avatar: profile.profileUrl
            })
            user = await userService.createUser(newUser)
            return cb(null, user)
        }
    })