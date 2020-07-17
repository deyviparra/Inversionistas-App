const { Router } = require("express");
const router = Router();
const { isAuthenticated } = require("../helpers/auth");
const {
  createNewAso,
  renderFichaInvAsociativo,
  renderEditInvAsociativo,
  renderInmuebleAsociativo,
  renderInversionistaAsociativo,
  deleteInversionAsociativo,
  updateInversionAsociativo,
  AsociarInmuebleAsociativo,
  AsociarInversionistaAsociativo,
  renderEditPPAsociativo,
  updatePPAsociativo,
  agregarPagoAsociativo,
  AddDateAsociativo,
  EliminarInmuebleAsociativo
  
} = require("../controllers/i_asociativo.controller");

// Agregar inversión
router.post("/inversion/asociativo", isAuthenticated, createNewAso);
router.get("/ficha-inversion/:id/asociativo", isAuthenticated, renderFichaInvAsociativo);
// ELiminar inversión
router.delete("/eliminar-inversion/:id/asociativo", isAuthenticated, deleteInversionAsociativo);
// Editar inversión
router.get("/edit-inversion/:id/asociativo", isAuthenticated, renderEditInvAsociativo);
router.put("/inversion/edit/:id/asociativo", isAuthenticated, updateInversionAsociativo);
// Agregar inmueble
router.get("/asociar-inmueble/:id/asociativo", isAuthenticated, renderInmuebleAsociativo);
router.put("/inmueble/add/:id/asociativo", isAuthenticated, AsociarInmuebleAsociativo);
router.put("/eliminar-inmueble/:id/asociativo/:index",isAuthenticated, EliminarInmuebleAsociativo)
// Agregar Co-inversionista
router.get("/asociar-inversionista/:id/asociativo", isAuthenticated, renderInversionistaAsociativo);
router.put("/inversionista/add/:id/asociativo", isAuthenticated, AsociarInversionistaAsociativo);
// Agregar pago 
router.get("/pago/add/:id/asociativo", isAuthenticated, agregarPagoAsociativo);
router.put("/pago/adddate/:id/asociativo", isAuthenticated, AddDateAsociativo);
// Editar plan de pagos y agregar ficheros
router.get("/edit-plan_pagos/:id/asociativo", isAuthenticated, renderEditPPAsociativo);
router.put("/plan_pago/edit/:id/asociativo", isAuthenticated, updatePPAsociativo);

module.exports = router;
