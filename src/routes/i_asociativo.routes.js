const { Router } = require("express");
const router = Router();

const { isAuthenticated } = require("../helpers/auth");

const {
  createNewAso,
  renderFichaInvAsociativo
} = require("../controllers/i_asociativo.controller");

router.post("/inversion/asociativo", isAuthenticated, createNewAso);

router.get(
  "/ficha-inversion/:id/asociativo",
  isAuthenticated,
  renderFichaInvAsociativo
);

module.exports = router;
