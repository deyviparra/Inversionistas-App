const asociativoCtrl = {};
const Inversionista = require("../models/Inversionista");
const Proyecto = require("../models/Proyecto");
const Iasociativo = require("../models/I_asociativo");

asociativoCtrl.createNewAso = async (req, res) => {
  const {
    inver_id,
    proyecto_id,
    fecha_inicio,
    fecha_cierre,
    n_acciones,
    valor_compra,
    fecha_entrega_prometida,
    tir_prometida,
    fecha_pago
  } = req.body;
  try {
    const { _id, nombre } = await Proyecto.findById(proyecto_id);
    const proyecto = { 'id': _id, 'nombre': nombre };
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
  }
  catch (e) {
    req.flash('error_msg', 'No es posible crear la inversión');
    res.redirect("/ficha-i/" + inver_id);
    console.log(e);
  }
};

asociativoCtrl.renderFichaInvAsociativo = async (req, res) => {
  try {
    const iasociativo = await Iasociativo.findById(req.params.id);
    const inversionista = await Inversionista.findById(iasociativo.inver_id);
    const backUrl = "/ficha-i/" + iasociativo.inver_id;
    res.render("modelos-inversion/ficha-inversion", {
      inversionista,
      iasociativo,
      backUrl
    });
  }
  catch (e) {
    const iasociativo = await Iasociativo.findById(req.params.id);
    const inversionista = await Inversionista.findById(iasociativo.inver_id);
    req.flash('error_msg', 'No es posible visualizar la inversión');
    res.redirect('/ficha-i/' + inversionista._id);
    console.log(e);
  }
};

asociativoCtrl.renderEditInvAsociativo = async (req, res) => {
  try {
    const iasociativo = await Iasociativo.findById(req.params.id);
    const inversionista = await Inversionista.findById(iasociativo.inver_id);
    const proyecto = await Proyecto.find();
    const backUrl = "/ficha-inversion/" + iasociativo._id + "/asociativo";
    res.render('modelos-inversion/edit-inversion', { inversionista, iasociativo, proyecto, backUrl })
  }
  catch (e) {
    const iasociativo = await Iasociativo.findById(req.params.id);
    req.flash('error_msg', 'No es posible modificar la inversión');
    res.redirect('/ficha-inversion/' + iasociativo._id + '/asociativo');
    console.log(e);
  }
};

asociativoCtrl.renderInmuebleAsociativo = async (req, res) => {
  try {
    const iasociativo = await Iasociativo.findById(req.params.id);
    const inversionista = await Inversionista.findById(iasociativo.inver_id);
    const backUrl = "/ficha-inversion/" + iasociativo._id + "/asociativo";
    res.render('modelos-inversion/asociar-inmueble', { inversionista, iasociativo, backUrl })
  }
  catch (e) {
    const iasociativo = await Iasociativo.findById(req.params.id);
    req.flash('error_msg', 'No es posible asociar inmueble');
    res.redirect('/ficha-inversion/' + iasociativo._id + '/asociativo');
    console.log(e);
  }
};

asociativoCtrl.renderInversionistaAsociativo = async (req, res) => {
  try {
    const iasociativo = await Iasociativo.findById(req.params.id);
    const inversionista = await Inversionista.findById(iasociativo.inver_id);
    const inversionistas = await Inversionista.find();
    const backUrl = "/ficha-inversion/" + iasociativo._id + "/asociativo";
    res.render('modelos-inversion/asociar-inversionista', { inversionista, iasociativo, inversionistas, backUrl })
  }
  catch (e) {
    const iasociativo = await Iasociativo.findById(req.params.id);
    req.flash('error_msg', 'No es posible asociar inversionista');
    res.redirect('/ficha-inversion/' + iasociativo._id + '/asociativo');
    console.log(e);
  }
};

asociativoCtrl.deleteInversionAsociativo = async (req, res) => {
  try {
    const iasociativo = await Iasociativo.findById(req.params.id);
    const inversionista = await Inversionista.findById(iasociativo.inver_id);
    await Iasociativo.findByIdAndDelete(req.params.id);
    req.flash('error_msg', 'Inversión eliminada');
    res.redirect('/ficha-i/' + inversionista._id);
  }
  catch (e) {
    const iasociativo = await Iasociativo.findById(req.params.id);
    req.flash('error_msg', 'La inversión no pudo ser eliminada');
    res.redirect('/ficha-inversion/' + iasociativo._id + '/asociativo');
    console.log(e);
  }
};

asociativoCtrl.updateInversionAsociativo = async (req, res) => {
  try {
    const {
      proyecto_id,
      fecha_inicio,
      fecha_cierre,
      n_acciones,
      valor_compra,
      fecha_entrega_prometida,
      tir_prometida
    } = req.body;
    const { _id, nombre } = await Proyecto.findById(proyecto_id);
    const proyecto = { 'id': _id, 'nombre': nombre };
    const iasociativo = await Iasociativo.findById(req.params.id);
    await Iasociativo.findByIdAndUpdate(req.params.id, {
      proyecto,
      fecha_inicio,
      fecha_cierre,
      n_acciones,
      valor_compra,
      fecha_entrega_prometida,
      tir_prometida
    });
    req.flash('success_msg', 'Inversion actualizada');
    res.redirect('/ficha-inversion/' + iasociativo._id + '/asociativo');
  }
  catch (e) {
    const iasociativo = await Iasociativo.findById(req.params.id);
    req.flash('error_msg', 'La inversión no pudo ser actualizada');
    res.redirect('/ficha-inversion/' + iasociativo._id + '/asociativo');
    console.log(e);
  }
};

asociativoCtrl.AsociarInmuebleAsociativo = async (req, res) => {
  try {
    const { inmuebles } = await Iasociativo.findById(req.params.id);
    const iasociativo = await Iasociativo.findById(req.params.id);
    const inmueble = req.body;
    inmueble.valor = Number(inmueble.valor);
    inmuebles.push(inmueble);
    await Iasociativo.findByIdAndUpdate(req.params.id, { inmuebles });
    req.flash('success_msg', 'Inmueble añadido');
    res.redirect('/ficha-inversion/' + iasociativo._id + '/asociativo');
  }
  catch (e) {
    const iasociativo = await Iasociativo.findById(req.params.id);
    req.flash('error_msg', 'El inmuble no pudo ser añadido');
    res.redirect('/ficha-inversion/' + iasociativo._id + '/asociativo');
    console.log(e);
  }
};

asociativoCtrl.AsociarInversionistaAsociativo = async (req, res) => {
  try {
    const { co_inversionista } = await Iasociativo.findById(req.params.id);
    const iasociativo = await Iasociativo.findById(req.params.id);
    const { _id, nombre, apellido } = await Inversionista.findById(req.body.co_inversionista);
    const inversionista = { 'id': _id, 'nombre': nombre + " " + apellido };
    co_inversionista.push(inversionista);
    await Iasociativo.findByIdAndUpdate(req.params.id, { co_inversionista });
    req.flash('success_msg', 'Inversionista añadido');
    res.redirect('/ficha-inversion/' + iasociativo._id + '/asociativo');
  }
  catch (e) {
    const iasociativo = await Iasociativo.findById(req.params.id);
    req.flash('error_msg', 'El Co-inversionista no pudo ser añadido');
    res.redirect('/ficha-inversion/' + iasociativo._id + '/asociativo');
    console.log(e);
  }
};

asociativoCtrl.renderEditPPAsociativo = async (req, res) => {
  const iasociativo = await Iasociativo.findById(req.params.id);
  const inversionista = await Inversionista.findById(iasociativo.inver_id);
  res.render('modelos-inversion/edit-plan_pagos', { inversionista, iasociativo });
};

asociativoCtrl.agregarPagoAsociativo = async (req, res) => {
  const iasociativo = await Iasociativo.findById(req.params.id);
  const inversionista = await Inversionista.findById(iasociativo.inver_id);
  res.render('modelos-inversion/agregar-fecha-pp', { inversionista, iasociativo });
};

asociativoCtrl.AddDateAsociativo = async (req, res) => {
  try {
    const { plan_pagos } = await Iasociativo.findById(req.params.id);
    const iasociativo = await Iasociativo.findById(req.params.id);
    const pago = req.body;
    const cuota = pago.couta;
    const fecha = pago.fecha;
    pago.couta = Number(cuota);
    pago.fecha = datespliter(fecha);
    plan_pagos.push(pago);
    await Iasociativo.findByIdAndUpdate(req.params.id, { plan_pagos });
    req.flash('success_msg', 'Fecha de Pago añadida');
    res.redirect('/ficha-inversion/' + iasociativo._id + '/asociativo');
  }
  catch (e) {
    const iasociativo = await Iasociativo.findById(req.params.id);
    req.flash('error_msg', 'La fecha de  pago no pudo ser añadida');
    res.redirect('/ficha-inversion/' + iasociativo._id + '/asociativo');
    console.log(e);
  }
};

asociativoCtrl.updatePPAsociativo = async (req, res) => {
  try {
    const iasociativo = await Iasociativo.findById(req.params.id);
    const plan = req.body;
    let plan_pagos = updatePlanPagos(plan);
    await Iasociativo.findByIdAndUpdate(req.params.id, { plan_pagos });
    req.flash('success_msg', 'Plan de pagos actualizado');
    res.redirect('/ficha-inversion/' + iasociativo._id + '/asociativo');
  }
  catch (e) {
    const iasociativo = await Iasociativo.findById(req.params.id);
    req.flash('error_msg', 'El plan de pagos no pudo ser actualizado');
    res.redirect('/ficha-inversion/' + iasociativo._id + '/asociativo');
    console.log(e);
  }
};

function crearPlan_pagos(fecha_cierre, fecha_inicio, valor_compra, fecha_pago) {
  try {
    let cierre = fecha_cierre.split("-");
    let inicio = fecha_inicio.split("-");

    let cierre_date = new Date(cierre[0], cierre[1] - 1, cierre[2]);
    let inicio_date = new Date(inicio[0], inicio[1] - 1, inicio[2]);
    let dif = cierre_date.getTime() - inicio_date.getTime();

    let fecha = new Date(dif);
    let meses = ((fecha.getUTCFullYear() - 1970) * 12) + (fecha.getUTCMonth());

    let couta = valor_compra / meses;

    let plan_pagos = new Array(meses);

    for (let i = 0; i < meses; i++) {
      inicio_date = new Date(inicio[0], inicio[1] - 1, inicio[2]);
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
  catch{
    console.log('No es posible crear el plan de pagos')
  }
}

function datespliter(fecha) {
  try {
    let fecha_arr = fecha.split("-");
    let dia = fecha_arr[2];
    let mes = fecha_arr[1];
    let ano = fecha_arr[0];
    let new_fecha = dia + "/" + mes + "/" + ano;
    return new_fecha;
  }
  catch{
    console.log('Error guardando nueva fecha en plan de pagos')
  }
}

function updatePlanPagos(plan) {
  let fechas = plan.fecha;
  let coutas = plan.couta;
  let pagos = plan.pago;

  let new_plan_pagos = new Array(fechas.length);

  for (let i = 0; i < fechas.length; i++) {
    let fecha = fechas[i];
    let couta = Number(coutas[i]);
    let pago = pagos[i];

    new_plan_pagos[i] = { fecha, couta, pago };
  }
  return (new_plan_pagos)
};

module.exports = asociativoCtrl;
