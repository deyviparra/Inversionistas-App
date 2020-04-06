const { Router } = require("express");
const router = Router();
const { isAuthenticated } = require('../helpers/auth')
const { 
    renderLogin, 
    renderRegistro, 
    registro, login, 
    logout, 
    renderFichaU,
    renderEditFormUser, 
    updateUser
} = require('../controllers/user.controllers')

// login
router.get('/usuarios/login', renderLogin)
router.post('/usuarios/login', login)
// Crear usuarios
router.get('/usuarios/registro',  renderRegistro)
router.post('/usuarios/registro',  registro)
// Logout
router.get('/usuarios/logout', logout)
// Ficha usuario y actualizar
router.get('/usuarios/perfil',  renderFichaU)
router.get("/edit-user/:id",  renderEditFormUser);
router.put("/user/edit/:id",  updateUser);

module.exports = router;
