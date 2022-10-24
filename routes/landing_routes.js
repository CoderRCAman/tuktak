const {
  getLandingPage,
  getVideoInfo,
} = require("../controller/landing_controller");
const { isAuthenticated } = require("../middleware/auth");

const router = require("express").Router();
router.route("/home").get(isAuthenticated , getLandingPage);

router.route("/video/:id").get(isAuthenticated ,getVideoInfo);
module.exports = router;
