const { Router } = require("express");
const router = Router();
const { unlink } = require("fs-extra");
const path = require("path");
var multer = require("multer");
var upload = multer({
  destination: path.join(__dirname, "public/uploads"),
  filename(req, file, cb) {
    cb(null, new Date().getTime() + path.extname(file.originalname));
  }
});

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
router.post("/inver/add", upload.single("image"), createNewInver);

router.get("/inver", renderInver);

//Edits
router.get("/inver/edit/:id", renderEditFormInver);
router.put("/inver/edit/:id", updateInver);

//Delete
router.delete("/inver/delete/:id", deleteInver);

router.get("/ficha-i", renderFichaI);

module.exports = router;
