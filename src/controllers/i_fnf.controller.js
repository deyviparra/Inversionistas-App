const ifnfCtrl = {};
const Inversionista = require("../models/Inversionista");
const Proyecto = require("../models/Proyecto");
const Ifnf = require("../models/I_fnf");



ifnfCtrl.createNewFnf = async (req, res) => {
  const {
    inver_id,
    proyecto,
    fecha_inicio,
    lega_mutuo_fidu,
    valor_mutuo,
    observaciones,
    tasa_interes,
    tasa_anual,
    porcentaje_cliente,
    porcentaje_garantia,
    fecha_pago
  } = req.body;
  const newFnf = new Ifnf({
    inver_id,
    proyecto,
    fecha_inicio,
    lega_mutuo_fidu,
    valor_mutuo,
    observaciones,
    tasa_interes,
    tasa_anual,
    porcentaje_cliente,
    porcentaje_garantia
  });

  newFnf.fecha_cierre = crearFechacierre(fecha_inicio);
  newFnf.plan_pago_intereses = crearPlan_pagos(fecha_inicio,tasa_interes, porcentaje_cliente, porcentaje_garantia, fecha_pago, valor_mutuo);
  //await newFnf.save();
  req.flash('success_msg', 'Inversión creada')
  res.redirect('/ficha-i/' + inver_id)
};

ifnfCtrl.renderFichaInvFnf = async (req, res) => {
  const ifnf = await Ifnf.findById(req.params.id);
  const inversionista = await Inversionista.findById(ifnf.inver_id);
  res.render("modelos-inversion/ficha-inversion", {
    inversionista,
    ifnf
  });
};

function crearFechacierre(fecha_inicio) {
  let inicio = fecha_inicio.split("-");
  inicio[0] = parseInt(inicio[0]) + 2;
  inicio[0] = String(inicio[0]);
  let cierre = new Date(inicio[0], inicio[1]-1, inicio[2]);

  let ano = cierre.getFullYear();
  let mes = cierre.getMonth() + 1;
  let dia = cierre.getDate();
  let fecha = ano + "-" + mes + "-" + dia;

  return fecha;
}

function crearPlan_pagos(fecha_inicio,tasa_interes, porcentaje_cliente, porcentaje_garantia, fecha_pago, valor_mutuo) {
  let inicio = fecha_inicio.split("-");
  let inicio_date = new Date(inicio[0], inicio[1]-1, inicio[2]);
  let plan_pagos = []
  let tasa = (Number(tasa_interes)/100) + 1;
  let porcentaje_c = (Number(porcentaje_cliente))/100;
  let porcentaje_g = (Number(porcentaje_garantia))/100;
  let valor = Number(valor_mutuo);
  
  for (let i = 0; i < 24; i++) {
    if (i==0){
      inicio[1]++;
    }
    inicio_date = new Date(inicio[0], inicio[1]-1, fecha_pago);
    let ano = inicio_date.getFullYear();
    let mes = inicio_date.getMonth();
    mes++;
    let dia = fecha_pago;
    let fecha = dia + "/" + mes+ "/" + ano;
   
    let couta_cliente = (((valor/24)*tasa)*porcentaje_c);
    let couta_garantia = (((valor/24)*tasa)*porcentaje_g);

    plan_pagos[i] = { fecha, couta_cliente, couta_garantia };

    inicio[1] = parseInt(inicio[1]) + 1;
    inicio[1] = String(inicio[1]);
  }
  console.log(plan_pagos);
  //return plan_pagos;
}

module.exports = ifnfCtrl;
