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
router.get("/edit-inver/:id", renderEditFormInver);

router.get("/ficha-i/:id", renderFichaI);
router.put("/inver/edit/:id", updateInver);

//Delete
router.delete("/inver/delete/:id", deleteInver);



module.exports = router;
