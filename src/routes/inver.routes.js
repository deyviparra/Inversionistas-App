const { Router } = require("express");
const router = Router();

const { isAuthenticated } = require('../helpers/auth')

const {
  renderInverForm,
  createNewInver,
  renderInver,
  renderEditFormInver,
  updateInver,
  deleteInver,
  renderFichaI,
  renderModelo,
  updateInvestment
} = require("../controllers/inver.controller");

router.get("/inver/add", isAuthenticated, renderInverForm);
router.post("/inver/add", isAuthenticated, createNewInver);

router.get("/inver", isAuthenticated, renderInver);
router.get("/ficha-i/:id", isAuthenticated, renderFichaI);

//Edits
router.get("/edit-inver/:id", isAuthenticated, renderEditFormInver);
router.put("/inver/edit/:id", isAuthenticated, updateInver);

//Delete
router.delete("/inver/delete/:id", deleteInver);

// Add Investment
router.get("/modelos-inversion/", isAuthenticated, renderModelo)
router.put("/inversion/add/:id", isAuthenticated, updateInvestment)


module.exports = router;
