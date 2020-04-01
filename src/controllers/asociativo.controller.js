const asociativoCtrl = {};
const Inversionista = require("../models/Inversionista");
const { unlink } = require("fs-extra");
const path = require("path");
const { uploadFile } = require("../upload.js");
const Proyecto = require("../models/Proyecto");
const I_asociativo = require("../models/I_asociativo");



asociativoCtrl.createNewAso = async (req, res) => {
  const {
    inver_id,
    proyecto,
    fecha_inicio,
    fecha_cierre,
    n_acciones,
    valor_compra,
    fecha_entrega_prometida,
    tir_prometida
  } = req.body;
  const newAsociativo = new I_asociativo({
    inver_id,
    proyecto,
    fecha_inicio,
    fecha_cierre,
    n_acciones,
    valor_compra,
    fecha_entrega_prometida,
    tir_prometida
  });


  await newAsociativo.save();
  req.flash('success_msg', 'Inversión creada')
  res.redirect('/ficha-i/' + inver_id)
};

module.exports = asociativoCtrl;
