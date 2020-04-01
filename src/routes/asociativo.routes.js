const { Router } = require("express");
const router = Router();

const { isAuthenticated } = require('../helpers/auth')

const {renderAso,createNewAso }= require("../controllers/asociativo.controller");



// router.put("/inversion/add/:id", updateInvestment)
router.post('/inversion/add',isAuthenticated, createNewAso)

module.exports = router;