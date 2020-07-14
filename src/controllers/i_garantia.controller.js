const igarantiaCtrl = {};
const Inversionista = require("../models/Inversionista");
const Proyecto = require("../models/Proyecto");
const Igarantia = require("../models/I_garantia");

igarantiaCtrl.createIgarantia = async (req, res) => {
  try {
    const inver_id = req.params.id;
    const {
      proyecto_id,
      fecha_inicio,
      duracion,
      periodo_liquidacion,
      valor_inversion,
      tasa_int_men
    } = req.body;
    const { _id, nombre } = await Proyecto.findById(proyecto_id);
    const proyecto = { 'id': _id, 'nombre': nombre };
    const newIgarantia = new Igarantia({
      inver_id,
      proyecto,
      fecha_inicio,
      duracion,
      periodo_liquidacion,
      valor_inversion,
      tasa_int_men
    });
    let fecha_pago = 19
    newIgarantia.plan_pago_intereses = crearPlan_pagos(fecha_inicio, tasa_int_men, fecha_pago, valor_inversion, periodo_liquidacion, duracion);
    newIgarantia.pagos_realizados = new Array(newIgarantia.plan_pago_intereses.length);
    await newIgarantia.save();
    req.flash('success_msg', 'Inversión creada');
    res.redirect('/ficha-i/' + req.params.id);
  }
  catch (e) {
    req.flash('error_msg', 'No se puede crear la inversión');
    res.redirect('/ficha-i/' + req.params.id);
    console.log(e);
  }
};

igarantiaCtrl.renderFichaInvGarantia = async (req, res) => {
  try {
    const igarantia = await Igarantia.findById(req.params.id);
    const inversionista = await Inversionista.findById(igarantia.inver_id);
    const backUrl = "/ficha-i/" + igarantia.inver_id;
    res.render('modelos-inversion/ficha-inversion', { inversionista, igarantia, backUrl });
  }
  catch (e) {
    const igarantia = await Igarantia.findById(req.params.id);
    const inversionista = await Inversionista.findById(igarantia.inver_id);
    req.flash('error_msg', 'No se puede visualizar la inversión');
    res.redirect('/ficha-i/' + inversionista._id);
    console.log(e);
  }
}

igarantiaCtrl.renderEditInvGarantia = async (req, res) => {
  try {
    const igarantia = await Igarantia.findById(req.params.id);
    const inversionista = await Inversionista.findById(igarantia.inver_id);
    const proyecto = await Proyecto.find();
    const backUrl = "/ficha-inversion/" + igarantia._id + "/garantia";
    res.render('modelos-inversion/edit-inversion', { inversionista, igarantia, proyecto, backUrl });
  }
  catch (e) {
    const igarantia = await Igarantia.findById(req.params.id);
    req.flash('error_msg', 'No se puede modificar la inversión');
    res.redirect('/ficha-inversion/' + igarantia._id + '/garantia');
    console.log(e);
  }
};

igarantiaCtrl.renderInversionistaGarantia = async (req, res) => {
  try {
    const igarantia = await Igarantia.findById(req.params.id);
    const inversionista = await Inversionista.findById(igarantia.inver_id);
    const inversionistas = await Inversionista.find();
    const backUrl = "/ficha-inversion/" + igarantia._id + "/garantia";
    res.render('modelos-inversion/asociar-inversionista', { inversionista, igarantia, inversionistas, backUrl });
  }
  catch (e) {
    const igarantia = await Igarantia.findById(req.params.id);
    req.flash('error_msg', 'No se puese asociar inversionista');
    res.redirect('/ficha-inversion/' + igarantia._id + '/garantia');
    console.log(e);
  }
};

igarantiaCtrl.deleteInversionGarantia = async (req, res) => {
  try {
    const igarantia = await Igarantia.findById(req.params.id);
    const inversionista = await Inversionista.findById(igarantia.inver_id);
    await Igarantia.findByIdAndDelete(req.params.id);
    req.flash('error_msg', 'Inversión eliminada');
    res.redirect('/ficha-i/' + inversionista._id);
  }
  catch (e) {
    const igarantia = await Igarantia.findById(req.params.id);
    req.flash('error_msg', 'La inversión no pudo ser eliminada');
    res.redirect('/ficha-inversion/' + igarantia._id + '/garantia');
    console.log(e);
  }
};

igarantiaCtrl.updateInversionGarantia = async (req, res) => {
  try {
    console.log(req.params.id);
    const {
      proyecto_id,
      fecha_inicio,
      duracion,
      periodo_liquidacion,
      valor_inversion,
      tasa_int_men
    } = req.body;
    const { _id, nombre } = await Proyecto.findById(proyecto_id);
    const proyecto = { 'id': _id, 'nombre': nombre };
    const igarantia = await Igarantia.findById(req.params.id);
    await Igarantia.findByIdAndUpdate(req.params.id, {
      proyecto,
      fecha_inicio,
      duracion,
      periodo_liquidacion,
      valor_inversion,
      tasa_int_men
    })
    req.flash('success_msg', 'Inversion actualizada');
    res.redirect('/ficha-inversion/' + igarantia._id + '/garantia');
  }
  catch (e) {
    const igarantia = await Igarantia.findById(req.params.id);
    req.flash('error_msg', 'La inversión no pudo ser actualizada');
    res.redirect('/ficha-inversion/' + igarantia._id + '/garantia');
    console.log(e);
  }
};

igarantiaCtrl.AsociarInversionistaGarantia = async (req, res) => {
  try {
    const { co_inversionista } = await Igarantia.findById(req.params.id);
    const igarantia = await Igarantia.findById(req.params.id);
    const { _id, nombre, apellido } = await Inversionista.findById(req.body.co_inversionista);
    const inversionista = { 'id': _id, 'nombre': nombre + " " + apellido };
    co_inversionista.push(inversionista);
    await Igarantia.findByIdAndUpdate(req.params.id, { co_inversionista });
    req.flash('success_msg', 'Inversionista añadido');
    res.redirect('/ficha-inversion/' + igarantia._id + '/garantia');
  }
  catch (e) {
    const igarantia = await Igarantia.findById(req.params.id);
    req.flash('error_msg', 'El Co-inversionista no pudo ser añadido');
    res.redirect('/ficha-inversion/' + igarantia._id + '/garantia');
    console.log(e);
  }
};

igarantiaCtrl.renderEditPPGarantia = async (req, res) => {
  const igarantia = await Igarantia.findById(req.params.id);
  const inversionista = await Inversionista.findById(igarantia.inver_id);
  res.render('modelos-inversion/edit-plan_pagos', { inversionista, igarantia });
};

igarantiaCtrl.agregarPagoGarantia = async (req, res) => {
  res.send('Agregar pago');
};

igarantiaCtrl.editarPPGarantia = async (req, res) => {
  res.send('Actualizar PP');
};


function crearPlan_pagos(fecha_inicio, tasa_int_men, fecha_pago, valor_inversiono, periodo_liquidacion, duracion) {
  try {
    let inicio = fecha_inicio.split("-");
    let inicio_date = new Date(inicio[0], inicio[1] - 1, inicio[2]);
    let meses = Number(duracion);
    let periodo = parseInt(periodo_liquidacion);
    let tasa = (Number(tasa_int_men) / 100) + 1;
    let valor = Number(valor_inversiono);

    let plan_pagos = [];
    let fecha_ant = 0;
    let dias = 0;

    for (let i = 0; i < meses / periodo; i++) {
      if (i == 0) {
        fecha_ant = new Date(inicio[0], inicio[1] - 1, inicio[2]);
        inicio[1] = parseInt(inicio[1]) + periodo;
        inicio[1] = String(inicio[1]);
        inicio_date = new Date(inicio[0], inicio[1] - 1, fecha_pago);
        dias = (inicio_date.getTime() - fecha_ant.getTime()) / (86400000);
      }
      inicio_date = new Date(inicio[0], inicio[1] - 1, fecha_pago);
      let ano = inicio_date.getFullYear();
      let mes = inicio_date.getMonth();
      mes++;
      let dia = fecha_pago;
      let fecha = dia + "/" + mes + "/" + ano;
      if (i != 0) {
        dias = (inicio_date.getTime() - fecha_ant.getTime()) / (86400000);
      }
      fecha_ant = inicio_date;

      let couta = (valor) * (((Math.pow(tasa, dias / 30)) - 1));

      plan_pagos[i] = { fecha, couta };

      inicio[1] = parseInt(inicio[1]) + periodo;
      inicio[1] = String(inicio[1]);
    }
    return plan_pagos;
  }
  catch{
    console.log('No es posible crear el plan de pagos')
  }
};
module.exports = igarantiaCtrl;