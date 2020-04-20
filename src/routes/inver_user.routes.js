const { Router } = require("express");
const router = Router();
const { isAuthenticated } = require('../helpers/auth')

const { 
    NewInverAsUser,
    RemoveInverAsUser
} = require('../controllers/inver_user.controller')

// Habilitar inversionista como usuario
router.get("/habilitar-user/:id", isAuthenticated, NewInverAsUser);
// Deshabilitar inversionista como usuario
router.get("/deshabilitar-user/:id", isAuthenticated, RemoveInverAsUser);

module.exports = router;
