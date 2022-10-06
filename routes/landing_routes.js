const {
  getLandingPage,
  getVideoInfo,
} = require("../controller/landing_controller");

const router = require("express").Router();
router.route("/home").get(getLandingPage);

router.route("/video/:id").get(getVideoInfo);
module.exports = router;
