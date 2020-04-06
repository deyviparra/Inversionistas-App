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
} = require("../controllers/inver.controller");

// Agregar inversionista
router.get("/inver/add", isAuthenticated, renderInverForm);
router.post("/inver/add", isAuthenticated, createNewInver);
// Visualizar inversionistas
router.get("/inver", isAuthenticated, renderInver);
router.get("/ficha-i/:id", isAuthenticated, renderFichaI);
//Edits
router.get("/edit-inver/:id", isAuthenticated, renderEditFormInver);
router.put("/inver/edit/:id", isAuthenticated, updateInver);
//Delete
router.delete("/inver/delete/:id",isAuthenticated, deleteInver);
// Add Investment
router.get("/inversion/add", isAuthenticated, renderModelo)

module.exports = router;
