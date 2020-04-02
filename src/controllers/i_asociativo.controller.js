const asociativoCtrl = {};
const Inversionista = require("../models/Inversionista");
const Proyecto = require("../models/Proyecto");
const Iasociativo = require("../models/I_asociativo");

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
  const newAsociativo = new Iasociativo({
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
  req.flash("success_msg", "Inversión creada");
  res.redirect("/ficha-i/" + inver_id);
};

asociativoCtrl.renderFichaInvAsociativo = async (req, res) => {
  const iasociativo = await Iasociativo.findById(req.params.id);
  const inversionista = await Inversionista.findById(iasociativo.inver_id);
  res.render("modelos-inversion/ficha-inversion", {
    inversionista,
    iasociativo
  });
};

module.exports = asociativoCtrl;
