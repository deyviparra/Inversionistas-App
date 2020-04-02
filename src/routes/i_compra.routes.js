const { Router } = require("express");
const router = Router();

const { isAuthenticated } = require("../helpers/auth");

const {
  createIcompra,
  renderFichaInvCompra
} = require("../controllers/i_compra.controller");

router.post("/inversion/compra/:id", isAuthenticated, createIcompra);

router.get(
  "/ficha-inversion/:id/compra",
  isAuthenticated,
  renderFichaInvCompra
);

module.exports = router;
