const { Router } = require("express");
const router = Router();
const {isAuthenticated} = require ('../helpers/auth')
const {
  renderIndex,
  renderMenuppal,
  renderNoticiaEdit,
  createNoticia,
  updateNoticia,
  renderCreateNoticia
} = require("../controllers/index.controller");

//Agregar noticia
router.get("/noticia/add", isAuthenticated, renderCreateNoticia);
router.post("/noticia/add", isAuthenticated, createNoticia);

router.get("/noticia/edit/:id", isAuthenticated, renderNoticiaEdit);
router.put("/noticia/edit/:id", isAuthenticated, updateNoticia);

router.get("/", renderIndex);
router.get("/menuppal", isAuthenticated, renderMenuppal);

module.exports = router;
