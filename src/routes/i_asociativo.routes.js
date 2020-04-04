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
  agregarPagoAsociativo,
  editarPPAsociativo
} = require("../controllers/i_asociativo.controller");

router.post("/inversion/asociativo",  createNewAso);
router.get("/ficha-inversion/:id/asociativo",renderFichaInvAsociativo);
router.get("/edit-inversion/:id/asociativo", renderEditInvAsociativo );
router.get("/asociar-inmueble/:id/asociativo", renderInmuebleAsociativo );
router.get("/asociar-inversionista/:id/asociativo", renderInversionistaAsociativo );

router.delete("/eliminar-inversion/:id/asociativo", deleteInversionAsociativo);

router.put("/inversion/edit/:id/asociativo",  updateInversionAsociativo);

router.put("/inmueble/add/:id/asociativo",  AsociarInmuebleAsociativo);

router.put("/inversionista/add/:id/asociativo",  AsociarInversionistaAsociativo);

router.get("/edit-plan_pagos/:id/asociativo", renderEditPPAsociativo );

router.put("/pago/add/:id/asociativo",  agregarPagoAsociativo);

router.put("/plan_pago/edit/:id/asociativo",  editarPPAsociativo);


module.exports = router;
