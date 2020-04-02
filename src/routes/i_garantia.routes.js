const { Router } = require("express");
const router = Router();

const { isAuthenticated } = require("../helpers/auth");

const {
  createIgarantia,
  renderFichaInvGarantia
} = require("../controllers/i_garantia.controller");

router.post("/inversion/garantia/:id", isAuthenticated, createIgarantia);
router.get(
  "/ficha-inversion/:id/garantia",
  isAuthenticated,
  renderFichaInvGarantia
);

module.exports = router;
