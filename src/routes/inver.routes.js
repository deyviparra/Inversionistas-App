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

router.get("/inver/add",  renderInverForm);
router.post("/inver/add",  createNewInver);

router.get("/inver",  renderInver);
router.get("/ficha-i/:id",  renderFichaI);

//Edits
router.get("/edit-inver/:id",  renderEditFormInver);
router.put("/inver/edit/:id",  updateInver);

//Delete
router.delete("/inver/delete/:id", deleteInver);

// Add Investment
router.get("/inversion/add",  renderModelo)



module.exports = router;
