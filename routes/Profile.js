const router = require("express").Router();
const { getProfilePage, getEditProfile, editProfile } = require("../controller/Profile");
const { isAuthenticated } = require("../middleware/auth");

router.route("/profile/:id").get(isAuthenticated , getProfilePage);
router.route("/profile/edit/:id") 
.get(isAuthenticated , getEditProfile) 
router.route("/profile/edit")
.post(isAuthenticated , editProfile) ;
module.exports = router;
