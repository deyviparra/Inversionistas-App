const { Router } = require("express");
const router = Router();
const {renderLogin,renderRegistro,registro,login,logout}= require('../controllers/user.controllers')

router.get('/usuarios/login',renderLogin)
router.post('/usuarios/login',login)
router.get('/usuarios/registro',renderRegistro)
router.post('/usuarios/registro',registro)
router.get('/usuarios/logout',logout)

module.exports = router;
