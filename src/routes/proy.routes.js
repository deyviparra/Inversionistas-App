const { Router } = require("express");
const router = Router();



const {
  renderProyForm,
  createNewProy,
  renderProy,
  renderEditFormProy,
  updateProy,
  deleteProy,
  renderFichaP
} = require("../controllers/proy.controller");

router.get("/proy/add", renderProyForm);

router.post("/proy/add",createNewProy);

//Get All proys
router.get("/proy", renderProy);

//Edit
router.get("/proy/edit/:id", renderEditFormProy);
router.put("/proy/edit/:id", updateProy);

//Delete
router.delete("/proy/delete/:id", deleteProy);

router.get("/ficha-p", renderFichaP);


module.exports = router;
