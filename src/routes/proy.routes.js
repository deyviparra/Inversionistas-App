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
  updateType
} = require("../controllers/proy.controller");

router.get("/proy/add",  renderProyForm);

router.post("/proy/add",  createNewProy);

//Get All proys
router.get("/proy",  renderProy);

//Edit
router.get("/edit-proy/:id",  renderEditFormProy);
router.get("/ficha-p/:id",  renderFichaP);
router.put("/proy/edit/:id",  updateProy);

//Delete
router.delete("/proy/delete/:id",  deleteProy);

// Add type 
router.get("/tipos/",  renderTipo)
router.put("/tipos/add/:id",  updateType)



module.exports = router;
