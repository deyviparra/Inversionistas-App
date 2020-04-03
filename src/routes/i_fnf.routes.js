const { Router } = require("express");
const router = Router();

const { isAuthenticated } = require("../helpers/auth");

const {
  createNewFnf,
  renderFichaInvFnf,renderEditInvFnf
} = require("../controllers/i_fnf.controller");

router.post("/inversion/fnf",  createNewFnf);
router.get("/ficha-inversion/:id/fnf",  renderFichaInvFnf);
router.get("/edit-inversion/:id/fnf", renderEditInvFnf );


module.exports = router;
