const { Router } = require("express");
const router = Router();

const { isAuthenticated } = require("../helpers/auth");

const {
  createIgarantia,
  renderFichaInvGarantia,renderEditInvgarantia
} = require("../controllers/i_garantia.controller");

router.post("/inversion/garantia/:id",  createIgarantia);
router.get("/ficha-inversion/:id/garantia",renderFichaInvGarantia);
router.get("/edit-inversion/:id/garantia", renderEditInvgarantia );


module.exports = router;
