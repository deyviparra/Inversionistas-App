const { Router } = require("express");
const router = Router();

const { isAuthenticated } = require("../helpers/auth");

const {createIcompra,
  renderFichaInvCompra,
  renderEditInvCompra,
  renderInmuebleCompra,
  renderInversionistaCompra,
  deleteInversionCompra,
  updateInversionCompra,
  AsociarInmuebleCompra,
  AsociarInversionistaCompra,
  renderEditPPCompra
} = require("../controllers/i_compra.controller");

router.post("/inversion/compra/:id",  createIcompra);
router.get("/ficha-inversion/:id/compra",renderFichaInvCompra);
router.get("/edit-inversion/:id/compra", renderEditInvCompra );
router.get("/asociar-inmueble/:id/compra", renderInmuebleCompra );
router.get("/asociar-inversionista/:id/compra", renderInversionistaCompra );

router.delete("/eliminar-inversion/:id/compra", deleteInversionCompra);

router.put("/inversion/edit/:id/compra",  updateInversionCompra);

router.put("/inmueble/add/:id/compra",  AsociarInmuebleCompra);

router.put("/inversionista/add/:id/compra",  AsociarInversionistaCompra);

router.get("/edit-plan_pagos/:id/compra", renderEditPPCompra );

module.exports = router;
