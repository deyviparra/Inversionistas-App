const { Router } = require("express");
const router = Router();

const { isAuthenticated } = require('../helpers/auth')

const {createNewAso }= require("../controllers/asociativo.controller");

router.post('/inversion/add',isAuthenticated, createNewAso)

module.exports = router;