const { Router } = require("express");
const router = Router();

const { isAuthenticated } = require("../helpers/auth");

const {
  createNewAso,
  renderFichaInvAsociativo,renderEditInvAsociativo
} = require("../controllers/i_asociativo.controller");

router.post("/inversion/asociativo",  createNewAso);

router.get("/ficha-inversion/:id/asociativo",renderFichaInvAsociativo);
router.get("/edit-inversion/:id/asociativo", renderEditInvAsociativo );


module.exports = router;
