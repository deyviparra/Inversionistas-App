const ifnfCtrl = {};
const Inversionista = require("../models/Inversionista");
const Proyecto = require("../models/Proyecto");
const Ifnf = require("../models/I_fnf");



ifnfCtrl.createNewFnf = async (req, res) => {
  const {
    inver_id,
    proyecto_id,
    fecha_inicio,
    lega_mutuo_fidu,
    valor_mutuo,
    observaciones,
    tasa_interes,
    porcentaje_cliente,
    porcentaje_garantia,
    fecha_pago
  } = req.body;
  try {
  const { _id, nombre } = await Proyecto.findById(proyecto_id)
  const proyecto = { 'id': _id, 'nombre': nombre }
    const newFnf = new Ifnf({
      inver_id,
      proyecto,
      fecha_inicio,
      lega_mutuo_fidu,
      valor_mutuo,
      observaciones,
      tasa_interes,
      porcentaje_cliente,
      porcentaje_garantia
    });
    // let tasa_anual = pendiente
    newFnf.fecha_cierre = crearFechacierre(fecha_inicio);
    newFnf.plan_pago_intereses = crearPlan_pagos(fecha_inicio, tasa_interes, porcentaje_cliente, porcentaje_garantia, fecha_pago, valor_mutuo);
    await newFnf.save();
    req.flash('success_msg', 'Inversión creada')
    res.redirect('/ficha-i/' + inver_id)
  }
  catch (e) {
    req.flash('error_msg', 'No es posible crear la inversión')
    res.redirect('/ficha-i/' + inver_id)
    console.log(e);
  }
};

ifnfCtrl.renderFichaInvFnf = async (req, res) => {
  try {
    const ifnf = await Ifnf.findById(req.params.id);
    const inversionista = await Inversionista.findById(ifnf.inver_id);
    const backUrl= "/ficha-i/" + ifnf.inver_id
    res.render("modelos-inversion/ficha-inversion", {
      inversionista,
      ifnf,backUrl
    });
  }
  catch (e) {
    const ifnf = await Ifnf.findById(req.params.id)
    const inversionista = await Inversionista.findById(ifnf.inver_id);
    req.flash('error_msg', 'No es posible visualizar la inversión')
    res.redirect('/ficha-i/' + inversionista._id)
    console.log(e);
  }
};

ifnfCtrl.renderEditInvFnf = async (req, res) => {
  try {
    const ifnf = await Ifnf.findById(req.params.id);
    const inversionista = await Inversionista.findById(ifnf.inver_id);
    const proyecto = await Proyecto.find();
    res.render('modelos-inversion/edit-inversion', { inversionista, ifnf, proyecto })
  }
  catch (e) {
    const ifnf = await Ifnf.findById(req.params.id)
    req.flash('error_msg', 'No es posible modificar la inversión')
    res.redirect('/ficha-inversion/' + ifnf._id + '/fnf')
    console.log(e);
  }
};

ifnfCtrl.renderInmuebleFnf = async (req, res) => {
  try {
    const ifnf = await Ifnf.findById(req.params.id);
    const inversionista = await Inversionista.findById(ifnf.inver_id);
    res.render('modelos-inversion/asociar-inmueble', { inversionista, ifnf })
  }
  catch (e) {
    const ifnf = await Ifnf.findById(req.params.id)
    req.flash('error_msg', 'No es posible asociar inmueble')
    res.redirect('/ficha-inversion/' + ifnf._id + '/fnf')
    console.log(e);
  }
};

ifnfCtrl.renderInversionistaFnf = async (req, res) => {
  try {
    const ifnf = await Ifnf.findById(req.params.id);
    const inversionista = await Inversionista.findById(ifnf.inver_id);
    const inversionistas = await Inversionista.find();
    res.render('modelos-inversion/asociar-inversionista', { inversionista, ifnf, inversionistas })
  }
  catch (e) {
    const ifnf = await Ifnf.findById(req.params.id)
    req.flash('error_msg', 'No es posible asociar Co-inversionista')
    res.redirect('/ficha-inversion/' + ifnf._id + '/fnf')
    console.log(e);
  }
};

ifnfCtrl.deleteInversionFnf = async (req, res) => {
  try {
    const ifnf = await Ifnf.findById(req.params.id);
    const inversionista = await Inversionista.findById(ifnf.inver_id);
    await Ifnf.findByIdAndDelete(req.params.id)
    req.flash('error_msg', 'Inversión eliminada');
    res.redirect('/ficha-i/' + inversionista._id)
  }
  catch (e) {
    const ifnf = await Ifnf.findById(req.params.id)
    req.flash('error_msg', 'La inversión no pudo ser eliminada')
    res.redirect('/ficha-inversion/' + ifnf._id + '/fnf')
    console.log(e);
  }
}

ifnfCtrl.updateInversionFnf = async (req, res) => {
  try {
    const {
      proyecto_id,
      fecha_inicio,
      lega_mutuo_fidu,
      valor_mutuo,
      observaciones,
      tasa_interes
    } = req.body;
    const { _id, nombre } = await Proyecto.findById(proyecto_id)
    const proyecto = { 'id': _id, 'nombre': nombre }
    const ifnf = await Ifnf.findById(req.params.id)
    await Ifnf.findByIdAndUpdate(req.params.id, {
      proyecto,
      fecha_inicio,
      lega_mutuo_fidu,
      valor_mutuo,
      observaciones,
      tasa_interes
    })
    req.flash('success_msg', 'Inversion actualizada')
    res.redirect('/ficha-inversion/' + ifnf._id + '/fnf')
  }
  catch (e) {
    const ifnf = await Ifnf.findById(req.params.id)
    req.flash('error_msg', 'La inversión no pudo ser actualizada')
    res.redirect('/ficha-inversion/' + ifnf._id + '/fnf')
    console.log(e);
  }
}

ifnfCtrl.AsociarInmuebleFnf = async (req, res) => {
  try {
    const { inmuebles } = await Ifnf.findById(req.params.id)
    const ifnf = await Ifnf.findById(req.params.id)
    const inmueble = req.body;
    inmueble.valor = Number(inmueble.valor)
    inmuebles.push(inmueble)
    await Ifnf.findByIdAndUpdate(req.params.id, { inmuebles })
    req.flash('success_msg', 'Inmueble añadido')
    res.redirect('/ficha-inversion/' + ifnf._id + '/fnf')
  }
  catch (e) {
    const ifnf = await Ifnf.findById(req.params.id)
    req.flash('error_msg', 'El inmueble no pudo ser añadido')
    res.redirect('/ficha-inversion/' + ifnf._id + '/fnf')
    console.log(e);
  }
}

ifnfCtrl.AsociarInversionistaFnf = async (req, res) => {
  try {
    const { co_inversionista } = await Ifnf.findById(req.params.id)
    const ifnf = await Ifnf.findById(req.params.id)
    const { _id, nombre, apellido } = await Inversionista.findById(req.body.co_inversionista)
    const inversionista = { 'id': _id, 'nombre': nombre + " " + apellido }
    co_inversionista.push(inversionista)
    await Ifnf.findByIdAndUpdate(req.params.id, { co_inversionista })
    req.flash('success_msg', 'Inversionista añadido')
    res.redirect('/ficha-inversion/' + ifnf._id + '/fnf')
  }
  catch (e) {
    const ifnf = await Ifnf.findById(req.params.id)
    req.flash('error_msg', 'El Co-inversionista no pudo ser añadido')
    res.redirect('/ficha-inversion/' + ifnf._id + '/fnf')
    console.log(e);
  }
}

ifnfCtrl.renderEditPPFnf = async (req, res) => {
  const ifnf = await Ifnf.findById(req.params.id);
  const inversionista = await Inversionista.findById(ifnf.inver_id);
  res.render('modelos-inversion/edit-plan_pagos', { inversionista, ifnf })
};

ifnfCtrl.agregarPagoFnf = async (req, res) => {
  res.send('Agregar pago')
};

ifnfCtrl.editarPPFnf = async (req, res) => {
  res.send('Actualizar PP')
};


function crearFechacierre(fecha_inicio) {
  try{
  let inicio = fecha_inicio.split("-");
  inicio[0] = parseInt(inicio[0]) + 2;
  inicio[0] = String(inicio[0]);
  let cierre = new Date(inicio[0], inicio[1] - 1, inicio[2]);

  let ano = cierre.getFullYear();
  let mes = cierre.getMonth() + 1;
  let dia = cierre.getDate();
  let fecha = ano + "-" + mes + "-" + dia;

  return fecha;
}
catch{
  console.log('No es posible crear la fecha de cierre')
}
}

function crearPlan_pagos(fecha_inicio, tasa_interes, porcentaje_cliente, porcentaje_garantia, fecha_pago, valor_mutuo) {
  try{
  let inicio = fecha_inicio.split("-");
  let inicio_date = new Date(inicio[0], inicio[1] - 1, inicio[2]);
  let plan_pagos = []
  let tasa = (Number(tasa_interes) / 100);
  let porcentaje_c = (Number(porcentaje_cliente)) / 100;
  let porcentaje_g = (Number(porcentaje_garantia)) / 100;
  let valor = Number(valor_mutuo);

  for (let i = 0; i < 24; i++) {
    if (i == 0) {
      inicio[1]++;
    }
    inicio_date = new Date(inicio[0], inicio[1] - 1, fecha_pago);
    let ano = inicio_date.getFullYear();
    let mes = inicio_date.getMonth();
    mes++;
    let dia = fecha_pago;
    let fecha = dia + "/" + mes + "/" + ano;

    let couta_cliente = (((valor) * tasa) * porcentaje_c);
    let couta_garantia = (((valor) * tasa) * porcentaje_g);

    plan_pagos[i] = { fecha, couta_cliente, couta_garantia };

    inicio[1] = parseInt(inicio[1]) + 1;
    inicio[1] = String(inicio[1]);
  }
  return plan_pagos;
}
catch{
  console.log('No es posible crear el plan de pagos')
}
}

module.exports = ifnfCtrl;
