import passport from "passport";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";

const authenticateToken = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, async (err, user) => {
    try {
      if (err || !user) {
        throw HttpError(401, "Not authorized");
      }
      req.user = user;
      next();
    } catch (error) {
      next(error);
    }
  })(req, res, next);
};

export default ctrlWrapper(authenticateToken);
