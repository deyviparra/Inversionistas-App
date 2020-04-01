const { Router } = require("express");
const router = Router();

const { isAuthenticated } = require('../helpers/auth')

const {
  createIgarantia
} = require("../controllers/i_garantia.controller");


router.post("/inversion/garantia/:id", isAuthenticated, createIgarantia)

module.exports = router;
