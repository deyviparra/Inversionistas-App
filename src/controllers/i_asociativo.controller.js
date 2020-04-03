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
    tir_prometida,
    fecha_pago
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
  newAsociativo.plan_pagos = crearPlan_pagos(fecha_cierre, fecha_inicio, valor_compra, fecha_pago);
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

asociativoCtrl.renderEditInvAsociativo = async (req,res) => {
  const iasociativo = await Iasociativo.findById(req.params.id);
  const inversionista = await Inversionista.findById(iasociativo.inver_id);
    res.render('modelos-inversion/edit-inversion', { inversionista, iasociativo })
};


function crearPlan_pagos(fecha_cierre, fecha_inicio, valor_compra, fecha_pago) {
  let cierre = fecha_cierre.split("-");
  let inicio = fecha_inicio.split("-");

  let cierre_date = new Date(cierre[0], cierre[1]-1, cierre[2]);
  let inicio_date = new Date(inicio[0], inicio[1]-1, inicio[2]);
  let dif = cierre_date.getTime() - inicio_date.getTime();

  let fecha = new Date(dif);
  let meses = ((fecha.getUTCFullYear() - 1970) * 12) + (fecha.getUTCMonth());

  let couta = valor_compra / meses;

  let plan_pagos = new Array(meses);

  for (let i = 0; i < meses; i++) {
    inicio_date = new Date(inicio[0], inicio[1]-1, inicio[2]);
    let ano = inicio_date.getFullYear();
    let mes = inicio_date.getMonth();
    mes++;
    let dia = fecha_pago
    let fecha = dia + "/" + mes + "/" + ano;
    plan_pagos[i] = { fecha, couta };
    inicio[1]++;
  }
  return plan_pagos;
}

module.exports = asociativoCtrl;
