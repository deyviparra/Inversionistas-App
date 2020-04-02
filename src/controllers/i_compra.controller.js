const icompraCtrl = {};
const Inversionista = require("../models/Inversionista");
const Proyecto = require("../models/Proyecto");
const Icompra = require("../models/I_compra");

icompraCtrl.createIcompra = async (req, res) => {
  const inver_id = req.params.id;
  const {
    proyecto,
    fecha_inicio,
    fecha_cierre,
    n_encargo_fidu,
    valor_compra,
    fecha_entrega_prometida,
    tir_prometida
  } = req.body;
  const newIcompra = new Icompra({
    inver_id,
    proyecto,
    fecha_inicio,
    fecha_cierre,
    n_encargo_fidu,
    valor_compra,
    fecha_entrega_prometida,
    tir_prometida
  });
  await newIcompra.save();
  req.flash("success_msg", "Inversión creada");
  res.redirect("/ficha-i/" + req.params.id);
};

icompraCtrl.renderFichaInvCompra = async (req, res) => {
  const icompra = await Icompra.findById(req.params.id);
  const inversionista = await Inversionista.findById(icompra.inver_id);
  res.render("modelos-inversion/ficha-inversion", { inversionista, icompra });
};

module.exports = icompraCtrl;
