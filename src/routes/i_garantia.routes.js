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

router.post("/inversion/garantia/:id",  createIgarantia);
router.get("/ficha-inversion/:id/garantia",renderFichaInvGarantia);
router.get("/edit-inversion/:id/garantia", renderEditInvGarantia );
router.get("/asociar-inversionista/:id/garantia", renderInversionistaGarantia );

router.delete("/eliminar-inversion/:id/garantia", deleteInversionGarantia);

router.put("/inversion/edit/:id/garantia",  updateInversionGarantia);

router.put("/inversionista/add/:id/garantia",  AsociarInversionistaGarantia);

router.get("/edit-plan_pagos/:id/garantia", renderEditPPGarantia );

router.put("/pago/add/:id/garantia",  agregarPagoGarantia);

router.put("/plan_pago/edit/:id/garantia",  editarPPGarantia);

module.exports = router;
