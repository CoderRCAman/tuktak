 function getAuthInfo(req) {
  if (req.cookies.loggedIn)
    return { status: true, user_id: req.cookies.user_id };
  return false;
}
module.exports = {getAuthInfo}
