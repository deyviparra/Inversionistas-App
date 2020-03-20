const { Router } = require("express");
const router = Router();



const {
  renderInverForm,
  createNewInver,
  renderInver,
  renderEditFormInver,
  updateInver,
  deleteInver,
  renderFichaI
} = require("../controllers/inver.controller");

router.get("/inver/add", renderInverForm);
router.post("/inver/add",  createNewInver);

router.get("/inver", renderInver);

//Edits
router.get("/inver/edit/:id", renderEditFormInver);
router.put("/inver/edit/:id", updateInver);

//Delete
router.delete("/inver/delete/:id", deleteInver);

router.get("/ficha-i", renderFichaI);

module.exports = router;
