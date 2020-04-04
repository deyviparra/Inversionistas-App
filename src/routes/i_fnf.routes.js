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

router.post("/inversion/fnf",  createNewFnf);
router.get("/ficha-inversion/:id/fnf",  renderFichaInvFnf);
router.get("/edit-inversion/:id/fnf", renderEditInvFnf );
router.get("/asociar-inmueble/:id/fnf", renderInmuebleFnf );
router.get("/asociar-inversionista/:id/fnf", renderInversionistaFnf );

router.delete("/eliminar-inversion/:id/fnf", deleteInversionFnf);

router.put("/inversion/edit/:id/fnf",  updateInversionFnf);

router.put("/inmueble/add/:id/fnf",  AsociarInmuebleFnf);

router.put("/inversionista/add/:id/fnf",  AsociarInversionistaFnf);

router.get("/edit-plan_pagos/:id/fnf", renderEditPPFnf );

router.put("/pago/add/:id/fnf",  agregarPagoFnf);

router.put("/plan_pago/edit/:id/fnf",  editarPPFnf);

module.exports = router;
