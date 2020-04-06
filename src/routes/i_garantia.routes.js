const { Router } = require("express");
const router = Router();
const { isAuthenticated } = require("../helpers/auth");
const {
  createIgarantia,
  renderFichaInvGarantia,
  renderEditInvGarantia,
  renderInversionistaGarantia,
  deleteInversionGarantia,
  updateInversionGarantia,
  AsociarInversionistaGarantia,
  renderEditPPGarantia,
  agregarPagoGarantia,
  editarPPGarantia
} = require("../controllers/i_garantia.controller");

// Agregar inversión
router.post("/inversion/garantia/:id", isAuthenticated, createIgarantia);
router.get("/ficha-inversion/:id/garantia",renderFichaInvGarantia);
// Eliminar inversión
router.delete("/eliminar-inversion/:id/garantia", isAuthenticated,deleteInversionGarantia);
// Editar inversión
router.get("/edit-inversion/:id/garantia",isAuthenticated, renderEditInvGarantia );
router.put("/inversion/edit/:id/garantia", isAuthenticated, updateInversionGarantia);
// Agregar Co-inversionista
router.get("/asociar-inversionista/:id/garantia",isAuthenticated, renderInversionistaGarantia );
router.put("/inversionista/add/:id/garantia", isAuthenticated, AsociarInversionistaGarantia);
// Editar plan de pagos
router.get("/edit-plan_pagos/:id/garantia",isAuthenticated, renderEditPPGarantia );
router.put("/plan_pago/edit/:id/garantia", isAuthenticated, editarPPGarantia);
// Agregar pago realizado
router.put("/pago/add/:id/garantia", isAuthenticated, agregarPagoGarantia);

module.exports = router;
