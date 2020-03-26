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
  renderFichaP
} = require("../controllers/proy.controller");

router.get("/proy/add", isAuthenticated, renderProyForm);

router.post("/proy/add", isAuthenticated, createNewProy);

//Get All proys
router.get("/proy", isAuthenticated, renderProy);

//Edit
router.get("/edit-proy/:id", isAuthenticated, renderEditFormProy);
router.get("/ficha-p/:id", isAuthenticated, renderFichaP);
router.put("/proy/edit/:id", isAuthenticated, updateProy);

//Delete
router.delete("/proy/delete/:id", isAuthenticated, deleteProy);



module.exports = router;
