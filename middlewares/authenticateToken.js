import passport from "passport";

const authenticateToken = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, async (err, user) => {
    if (err || !user) {
      throw HttpError(401, "Not authorized");
    }
    req.user = user;
    next();
  })(req, res, next);
};

export default authenticateToken;
