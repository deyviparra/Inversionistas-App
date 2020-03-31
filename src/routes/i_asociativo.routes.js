const { Router } = require("express");
const router = Router();

const { isAuthenticated } = require('../helpers/auth')

const {renderAsoForm }= require("../controllers/i_asociativo.controller");

router.get("/aso/add", isAuthenticated, renderInverForm);


module.exports = router;