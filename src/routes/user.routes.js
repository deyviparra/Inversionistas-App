const { Router } = require("express");
const router = Router();
const { renderLogin, renderRegistro, registro, login, logout, renderFichaU,renderEditFormUser, updateUser} = require('../controllers/user.controllers')

const { isAuthenticated } = require('../helpers/auth')

router.get('/usuarios/login', renderLogin)
router.post('/usuarios/login', login)
router.get('/usuarios/registro',  renderRegistro)
router.post('/usuarios/registro',  registro)
router.get('/usuarios/logout',  logout)
router.get('/usuarios/perfil',  renderFichaU)
router.get("/edit-user/:id",  renderEditFormUser);
router.put("/user/edit/:id",  updateUser);

module.exports = router;
