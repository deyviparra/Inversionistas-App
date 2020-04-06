const { Router } = require("express");
const router = Router();
const { isAuthenticated } = require("../helpers/auth");
const {
  createIcompra,
  renderFichaInvCompra,
  renderEditInvCompra,
  renderInmuebleCompra,
  renderInversionistaCompra,
  deleteInversionCompra,
  updateInversionCompra,
  AsociarInmuebleCompra,
  AsociarInversionistaCompra,
  renderEditPPCompra,
  agregarPagoCompra,
  editarPPCompra
} = require("../controllers/i_compra.controller");

// Agregar inversión
router.post("/inversion/compra/:id", isAuthenticated, createIcompra);
router.get("/ficha-inversion/:id/compra",isAuthenticated,renderFichaInvCompra);
// Eliminar inversión
router.delete("/eliminar-inversion/:id/compra",isAuthenticated, deleteInversionCompra);
// Agregar inversión
router.get("/edit-inversion/:id/compra", isAuthenticated,renderEditInvCompra );
router.put("/inversion/edit/:id/compra", isAuthenticated, updateInversionCompra);
// Agregar inmueble
router.get("/asociar-inmueble/:id/compra",isAuthenticated, renderInmuebleCompra );
router.put("/inmueble/add/:id/compra", isAuthenticated, AsociarInmuebleCompra);
// Agregar Co-inversionista
router.get("/asociar-inversionista/:id/compra",isAuthenticated, renderInversionistaCompra );
router.put("/inversionista/add/:id/compra", isAuthenticated, AsociarInversionistaCompra);
// Editar plan de pagos
router.get("/edit-plan_pagos/:id/compra",isAuthenticated, renderEditPPCompra );
router.put("/plan_pago/edit/:id/compra", isAuthenticated, editarPPCompra);
// Agregar pago realizado
router.put("/pago/add/:id/compra", isAuthenticated, agregarPagoCompra);

module.exports = router;
