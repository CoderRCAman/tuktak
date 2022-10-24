const isAuthenticated = (req, res, next) => { 
  console.log(req.cookies);
  if (req.cookies.loggedIn === 'true') return next();
  return res
    .status(401)
    .json({ msg: "You are not authorized to access this page!" });
};

const isNotAuthenticated = (req, res, next) => {
  if (req.cookies.loggedIn) next();
  return res.redirect("/");
};

module.exports = {isAuthenticated,isNotAuthenticated}