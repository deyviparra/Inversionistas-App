const { Router } = require("express");
const router = Router();
const {renderLogin,renderRegistro,registro,login,logout}= require('../controllers/user.controllers')

const {isAuthenticated} = require ('../helpers/auth')

router.get('/usuarios/login',renderLogin)
router.post('/usuarios/login',login)
router.get('/usuarios/registro', isAuthenticated, renderRegistro)
router.post('/usuarios/registro', isAuthenticated,registro)
router.get('/usuarios/logout', isAuthenticated,logout)

module.exports = router;
