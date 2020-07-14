const icompraCtrl = {};
const Inversionista = require("../models/Inversionista");
const Proyecto = require("../models/Proyecto");
const Icompra = require("../models/I_compra");

icompraCtrl.createIcompra = async (req, res) => {
  try {
    const inver_id = req.params.id;
    const {
      proyecto_id,
      fecha_inicio,
      fecha_cierre,
      n_encargo_fidu,
      valor_compra,
      fecha_entrega_prometida,
      tir_prometida,
      fecha_pago
    } = req.body;
    const { _id, nombre } = await Proyecto.findById(proyecto_id)
    const proyecto = { 'id': _id, 'nombre': nombre }
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
    newIcompra.plan_pagos = crearPlan_pagos(fecha_cierre, fecha_inicio, valor_compra, fecha_pago);
    await newIcompra.save();
    req.flash("success_msg", "Inversión creada");
    res.redirect("/ficha-i/" + req.params.id);
  }
  catch (e) {
    req.flash('error_msg', 'No es posible crear la inversión')
    res.redirect("/ficha-i/" + req.params.id);
    console.log(e);
  }
};

icompraCtrl.renderFichaInvCompra = async (req, res) => {
  try {
    const icompra = await Icompra.findById(req.params.id);
    const inversionista = await Inversionista.findById(icompra.inver_id);
    const backUrl = "/ficha-i/" + icompra.inver_id;
    res.render("modelos-inversion/ficha-inversion", { inversionista, icompra, backUrl });
  }
  catch (e) {
    const icompra = await Icompra.findById(req.params.id)
    const inversionista = await Inversionista.findById(icompra.inver_id);
    req.flash('error_msg', 'No es posible visualizar la inversión')
    res.redirect('/ficha-i/' + inversionista._id)
    console.log(e);
  }
};

icompraCtrl.renderEditInvCompra = async (req, res) => {
  try {
    const icompra = await Icompra.findById(req.params.id);
    const inversionista = await Inversionista.findById(icompra.inver_id);
    const proyecto = await Proyecto.find();
    const backUrl = "/ficha-inversion/" + icompra._id + "/compra";
    res.render('modelos-inversion/edit-inversion', { inversionista, icompra, proyecto, backUrl })
  }
  catch (e) {
    const icompra = await Icompra.findById(req.params.id)
    req.flash('error_msg', 'No es posible modificar inversión')
    res.redirect('/ficha-inversion/' + icompra._id + '/compra')
    console.log(e);
  }
};

icompraCtrl.renderInmuebleCompra = async (req, res) => {
  try {
    const icompra = await Icompra.findById(req.params.id);
    const inversionista = await Inversionista.findById(icompra.inver_id);
    const backUrl = "/ficha-inversion/" + icompra._id + "/compra";
    res.render('modelos-inversion/asociar-inmueble', { inversionista, icompra, backUrl })
  }
  catch (e) {
    const icompra = await Icompra.findById(req.params.id)
    req.flash('error_msg', 'No es posible asociar inmueble')
    res.redirect('/ficha-inversion/' + icompra._id + '/compra')
    console.log(e);
  }
};

icompraCtrl.renderInversionistaCompra = async (req, res) => {
  try {
    const icompra = await Icompra.findById(req.params.id);
    const inversionista = await Inversionista.findById(icompra.inver_id);
    const inversionistas = await Inversionista.find();
    const backUrl = "/ficha-inversion/" + icompra._id + "/compra";
    res.render('modelos-inversion/asociar-inversionista', { inversionista, icompra, inversionistas, backUrl })
  }
  catch (e) {
    const icompra = await Icompra.findById(req.params.id)
    req.flash('error_msg', 'No es posible asociar Co-inversionista')
    res.redirect('/ficha-inversion/' + icompra._id + '/compra')
    console.log(e);
  }
};

icompraCtrl.deleteInversionCompra = async (req, res) => {
  try {
    const icompra = await Icompra.findById(req.params.id);
    const inversionista = await Inversionista.findById(icompra.inver_id);
    await Icompra.findByIdAndDelete(req.params.id)
    req.flash('error_msg', 'Inversión eliminada');
    res.redirect('/ficha-i/' + inversionista._id)
  }
  catch (e) {
    const icompra = await Icompra.findById(req.params.id)
    req.flash('error_msg', 'La inversión no pudo ser eliminada')
    res.redirect('/ficha-inversion/' + icompra._id + '/compra')
    console.log(e);
  }
};

icompraCtrl.updateInversionCompra = async (req, res) => {
  try {
    const {
      proyecto_id,
      fecha_inicio,
      fecha_cierre,
      n_encargo_fidu,
      valor_compra,
      fecha_entrega_prometida,
      tir_prometida
    } = req.body;
    const { _id, nombre } = await Proyecto.findById(proyecto_id)
    const proyecto = { 'id': _id, 'nombre': nombre }
    const icompra = await Icompra.findById(req.params.id)
    await Icompra.findByIdAndUpdate(req.params.id, {
      proyecto,
      fecha_inicio,
      fecha_cierre,
      n_encargo_fidu,
      valor_compra,
      fecha_entrega_prometida,
      tir_prometida
    })
    req.flash('success_msg', 'Inversion actualizada')
    res.redirect('/ficha-inversion/' + icompra._id + '/compra')
  }
  catch (e) {
    const icompra = await Icompra.findById(req.params.id)
    req.flash('error_msg', 'La inversión no pudo ser actualizada')
    res.redirect('/ficha-inversion/' + icompra._id + '/compra')
    console.log(e);
  }
};

icompraCtrl.AsociarInmuebleCompra = async (req, res) => {
  try {
    const { inmuebles } = await Icompra.findById(req.params.id)
    const icompra = await Icompra.findById(req.params.id)
    const inmueble = req.body;
    inmueble.valor = Number(inmueble.valor)
    inmuebles.push(inmueble)
    await Icompra.findByIdAndUpdate(req.params.id, { inmuebles })
    req.flash('success_msg', 'Inmueble añadido')
    res.redirect('/ficha-inversion/' + icompra._id + '/compra')
  }
  catch (e) {
    const icompra = await Icompra.findById(req.params.id)
    req.flash('error_msg', 'El inmueble no pudo ser añadido')
    res.redirect('/ficha-inversion/' + icompra._id + '/compra')
    console.log(e);
  }
};

icompraCtrl.AsociarInversionistaCompra = async (req, res) => {
  try {
    const { co_inversionista } = await Icompra.findById(req.params.id)
    const icompra = await Icompra.findById(req.params.id)
    const { _id, nombre, apellido } = await Inversionista.findById(req.body.co_inversionista)
    const inversionista = { 'id': _id, 'nombre': nombre + " " + apellido }
    co_inversionista.push(inversionista)
    await Icompra.findByIdAndUpdate(req.params.id, { co_inversionista })
    req.flash('success_msg', 'Inversionista añadido')
    res.redirect('/ficha-inversion/' + icompra._id + '/compra')
  }
  catch (e) {
    const icompra = await Icompra.findById(req.params.id)
    req.flash('error_msg', 'El Co-inversionista no pudo ser añadido')
    res.redirect('/ficha-inversion/' + icompra._id + '/compra')
    console.log(e);
  }
}

icompraCtrl.renderEditPPCompra = async (req, res) => {
  const icompra = await Icompra.findById(req.params.id);
  const inversionista = await Inversionista.findById(icompra.inver_id);
  const backUrl = "/ficha-inversion/" + icompra._id + "/compra";
  res.render('modelos-inversion/edit-plan_pagos', { inversionista, icompra, backUrl })
};

icompraCtrl.agregarPagoCompra = async (req, res) => {
  res.send('Agregar pago')
};

icompraCtrl.editarPPCompra = async (req, res) => {
  res.send('Actualizar PP')
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
};

module.exports = icompraCtrl;
