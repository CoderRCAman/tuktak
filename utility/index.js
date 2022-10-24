 function getAuthInfo(req) {
  if (req.cookies.loggedIn)
    return { status: true, user_id: req.cookies.user_id  , avatar: req.cookies.avatar,name:req.cookies.name };
  return false;
}
module.exports = {getAuthInfo}
