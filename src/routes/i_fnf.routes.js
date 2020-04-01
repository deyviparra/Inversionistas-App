const { Router } = require("express");
const router = Router();

const { isAuthenticated } = require('../helpers/auth')

const {createNewFnf }= require("../controllers/i_fnf.controller");



// router.put("/inversion/add/:id", updateInvestment)
router.post('/inversion/fnf',isAuthenticated, createNewFnf)

module.exports = router;