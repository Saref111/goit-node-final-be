import passport from "passport";
import passportJWT from "passport-jwt";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

const secret = process.env.JWT_SECRET;

const ExtractJWT = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;
const params = {
  secretOrKey: secret,
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
};

passport.use(
  new Strategy(params, async (payload, done) => {
    try {
      const user = await User.findOne({ _id: payload.id });
      if (!user) {
        return done(new Error("User not found"));
      }
      return done(null, user);
    } catch (err) {
      done(err);
    }
  })
);
