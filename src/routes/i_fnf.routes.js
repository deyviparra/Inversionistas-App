const { Router } = require("express");
const router = Router();

const { isAuthenticated } = require("../helpers/auth");

const {
  createNewFnf,
  renderFichaInvFnf
} = require("../controllers/i_fnf.controller");

// router.put("/inversion/add/:id", updateInvestment)
router.post("/inversion/fnf", isAuthenticated, createNewFnf);

router.get("/ficha-inversion/:id/fnf", isAuthenticated, renderFichaInvFnf);

module.exports = router;
