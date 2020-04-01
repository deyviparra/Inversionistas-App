const { Router } = require("express");
const router = Router();

const { isAuthenticated } = require('../helpers/auth')

const {
  createInvestment
} = require("../controllers/i_compra.controller");


router.post("/inversion/add/:id", isAuthenticated, createInvestment)

module.exports = router;
