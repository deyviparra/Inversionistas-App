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
  renderAgregarPagoFnf,
  agregarPagoFnf,
  editarPPFnf,
  EliminarInmuebleFnf,
  EliminarCoInverFnf,
  generarInforme
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
router.put("/eliminar-inmueble/:id/fnf/:index",isAuthenticated, EliminarInmuebleFnf);
// Agregar Co-inversionista
router.get("/asociar-inversionista/:id/fnf", isAuthenticated,renderInversionistaFnf );
router.put("/inversionista/add/:id/fnf", isAuthenticated,AsociarInversionistaFnf);
router.put("/eliminar-coinver/:id/fnf/:index",isAuthenticated,EliminarCoInverFnf);
// Editar plan de pagos
router.get("/edit-plan_pagos/:id/fnf",isAuthenticated, renderEditPPFnf );
router.get("/add-pago/:id/fnf",isAuthenticated, renderEditPPFnf );
router.put("/plan_pago/edit/:id/fnf", isAuthenticated, editarPPFnf);
// Agregar pago realizado
router.get("/pago/add/:id/fnf", isAuthenticated, renderAgregarPagoFnf);
router.put("/pago/add/:id/fnf", isAuthenticated, agregarPagoFnf);

//generar informe
router.post("/generar-informe/:id/fnf", isAuthenticated, generarInforme);

module.exports = router;
