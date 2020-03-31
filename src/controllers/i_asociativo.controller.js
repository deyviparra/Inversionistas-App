const asociativoCtrl = {}
const Inversionista = require("../models/Inversionista");
const { unlink } = require("fs-extra");
const path = require("path");
const {uploadFile}=require('../upload.js')
const Proyecto = require("../models/Proyecto");


asociativoCtrl.renderAsoForm = (req,res)=>{
    res.render('modelos-inversion/asociativo')
}

module.exports = asociativoCtrl;