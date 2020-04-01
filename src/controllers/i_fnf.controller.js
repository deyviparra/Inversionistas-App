const ifnfCtrl = {};
const Inversionista = require("../models/Inversionista");
const Proyecto = require("../models/Proyecto");
const I_fnf = require("../models/I_fnf");



ifnfCtrl.createNewFnf = async (req, res) => {
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
  const newFnf = new I_fnf({
    inver_id,
    proyecto,
    fecha_inicio,
    fecha_cierre,
    n_acciones,
    valor_compra,
    fecha_entrega_prometida,
    tir_prometida
  });


  await newFnf.save();
  req.flash('success_msg', 'Inversión creada')
  res.redirect('/ficha-i/' + inver_id)
};

module.exports = ifnfCtrl;
