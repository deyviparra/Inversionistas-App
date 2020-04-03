const { Router } = require("express");
const router = Router();

const {isAuthenticated} = require ('../helpers/auth')

const {
  renderIndex,
  renderMenuppal
} = require("../controllers/index.controller");


router.get("/", renderIndex);
router.get("/menuppal",  renderMenuppal);

module.exports = router;
