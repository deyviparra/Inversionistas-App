const { Router } = require("express");
const router = Router();

const {isAuthenticated} = require ('../helpers/auth')

const {
  renderIndex,
  renderLogin,
  renderMenuppal,
  renderRegistro
} = require("../controllers/index.controller");

router.get("/", renderIndex);
router.get("/menuppal", isAuthenticated, renderMenuppal);

module.exports = router;
