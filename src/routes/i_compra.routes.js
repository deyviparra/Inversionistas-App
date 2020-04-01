const { Router } = require("express");
const router = Router();

const { isAuthenticated } = require('../helpers/auth')

const {
  createIcompra
} = require("../controllers/i_compra.controller");


router.post("/inversion/compra/:id", isAuthenticated, createIcompra)

module.exports = router;
