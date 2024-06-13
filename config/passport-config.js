import passport from "passport";
import passportJWT from "passport-jwt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

const secret = process.env.JWT_SECRET;

const ExtractJWT = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;
const params = {
  secretOrKey: secret,
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  passReqToCallback: true,
};

passport.use(
  new Strategy(params, async (req, payload, done) => {
    try {
      const user = await User.findOne({ _id: payload.id });
      if (!user || !user.token) {
        return done(new Error("User not found or token missing"));
      }

      const tokenFromHeader = params.jwtFromRequest(req);
      try {
        jwt.verify(tokenFromHeader, secret);
      } catch (err) {
        if (err.name === "TokenExpiredError") {
          return done(new Error("Token has expired"), false);
        }
        return done(new Error("Token is invalid"), false);
      }
      
      if (user.token !== tokenFromHeader) {
        return done(new Error("Token does not match"), false);
      }

      return done(null, user);
    } catch (err) {
      return done(err, false);
    }
  })
);

export default passport;
