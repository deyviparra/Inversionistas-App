const { Router } = require("express");
const router = Router();

const {isAuthenticated} = require ('../helpers/auth')

const {
  renderInverForm,
  createNewInver,
  renderInver,
  renderEditFormInver,
  updateInver,
  deleteInver,
  renderFichaI
} = require("../controllers/inver.controller");

router.get("/inver/add", isAuthenticated, renderInverForm);
router.post("/inver/add", isAuthenticated,  createNewInver);

router.get("/inver",isAuthenticated, renderInver);

//Edits
router.get("/edit-inver/:id", isAuthenticated, renderEditFormInver);
router.get("/ficha-i/:id", isAuthenticated, renderFichaI);
router.put("/inver/edit/:id", isAuthenticated, updateInver);

//Delete
router.delete("/inver/delete/:id", deleteInver);



module.exports = router;
