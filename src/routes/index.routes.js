const { Router } = require("express");
const router = Router();

const {
  renderIndex,
  renderLogin,
  renderMenuppal,
  renderRegistro
} = require("../controllers/index.controller");

router.get("/", renderIndex);
router.get("/login", renderLogin);
router.get("/menuppal", renderMenuppal);
router.get("/registro", renderRegistro);

module.exports = router;
