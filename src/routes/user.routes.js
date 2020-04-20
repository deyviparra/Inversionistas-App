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
} = require('../controllers/user.controller')

// login
router.get('/usuarios/login', renderLogin)
router.post('/usuarios/login', login)
// Crear usuarios
router.get('/usuarios/registro', isAuthenticated, renderRegistro)
router.post('/usuarios/registro', isAuthenticated, registro)
// Logout
router.get('/usuarios/logout', isAuthenticated,logout)
// Ficha usuario y actualizar
router.get('/usuarios/perfil', isAuthenticated, renderFichaU)
router.get("/edit-user/:id", isAuthenticated, renderEditFormUser);
router.put("/user/edit/:id", isAuthenticated, updateUser);

module.exports = router;
