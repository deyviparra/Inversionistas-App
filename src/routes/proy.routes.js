const { Router } = require("express");
const router = Router();
const {isAuthenticated} = require ('../helpers/auth')
const {
  renderProyForm,
  createNewProy,
  renderProy,
  renderEditFormProy,
  updateProy,
  deleteProy,
  renderFichaP,
  renderTipo,
  updateType,
  deleteType
} = require("../controllers/proy.controller");

// Agregar proyecto
router.get("/proy/add", isAuthenticated, renderProyForm);
router.post("/proy/add", isAuthenticated, createNewProy);
//Get All proys
router.get("/proy",  renderProy);
//Edit
router.get("/edit-proy/:id", isAuthenticated, renderEditFormProy);
router.get("/ficha-p/:id", isAuthenticated, renderFichaP);
router.put("/proy/edit/:id", isAuthenticated, updateProy);
//Delete
router.delete("/proy/delete/:id", isAuthenticated, deleteProy);
// Add type 
router.get("/tipos/", isAuthenticated, renderTipo)
router.put("/tipos/add/:id", isAuthenticated, updateType)
router.put("/eliminar-tipoapto/:id/:index", isAuthenticated, deleteType)


module.exports = router;
