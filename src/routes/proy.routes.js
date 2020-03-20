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
  renderProyForm,
  createNewProy,
  renderProy,
  renderEditFormProy,
  updateProy,
  deleteProy,
  renderFichaP
} = require("../controllers/proy.controller");

router.get("/proy/add", renderProyForm);

router.post("/proy/add",upload.single('image'), createNewProy);

//Get All proys
router.get("/proy", renderProy);

//Edit
router.get("/proy/edit/:id", renderEditFormProy);
router.put("/proy/edit/:id", updateProy);

//Delete
router.delete("/proy/delete/:id", deleteProy);

router.get("/ficha-p", renderFichaP);


module.exports = router;
