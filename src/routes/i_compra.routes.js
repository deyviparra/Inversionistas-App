const { Router } = require("express");
const router = Router();

const { isAuthenticated } = require("../helpers/auth");

const {
  createIcompra,
  renderFichaInvCompra,renderEditInvCompra
} = require("../controllers/i_compra.controller");

router.post("/inversion/compra/:id",  createIcompra);

router.get("/ficha-inversion/:id/compra",renderFichaInvCompra);

router.get("/edit-inversion/:id/compra", renderEditInvCompra );


module.exports = router;
