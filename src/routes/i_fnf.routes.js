const { Router } = require("express");
const router = Router();
const { isAuthenticated } = require("../helpers/auth");
const {
  createNewFnf,
  renderFichaInvFnf,
  renderEditInvFnf,
  renderInmuebleFnf,
  renderInversionistaFnf,
  deleteInversionFnf,
  updateInversionFnf,
  AsociarInmuebleFnf,
  AsociarInversionistaFnf,
  renderEditPPFnf,
  agregarPagoFnf,
  editarPPFnf
} = require("../controllers/i_fnf.controller");

// Agregar inversión
router.post("/inversion/fnf", isAuthenticated, createNewFnf);
router.get("/ficha-inversion/:id/fnf", isAuthenticated, renderFichaInvFnf);
// Eliminar inversión
router.delete("/eliminar-inversion/:id/fnf", isAuthenticated,deleteInversionFnf);
// Editar inversión
router.get("/edit-inversion/:id/fnf", isAuthenticated,renderEditInvFnf );
router.put("/inversion/edit/:id/fnf", isAuthenticated, updateInversionFnf);
// Agregar inmbuele
router.get("/asociar-inmueble/:id/fnf",isAuthenticated, renderInmuebleFnf );
router.put("/inmueble/add/:id/fnf", isAuthenticated, AsociarInmuebleFnf);
// Agregar Co-inversionista
router.get("/asociar-inversionista/:id/fnf", isAuthenticated,renderInversionistaFnf );
router.put("/inversionista/add/:id/fnf", isAuthenticated, AsociarInversionistaFnf);
// Editar plan de pagos
router.get("/edit-plan_pagos/:id/fnf",isAuthenticated, renderEditPPFnf );
router.put("/plan_pago/edit/:id/fnf", isAuthenticated, editarPPFnf);
// Agregar pago realizado
router.put("/pago/add/:id/fnf", isAuthenticated, agregarPagoFnf);

module.exports = router;
