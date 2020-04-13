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
  const {_id,nombre} =await Proyecto.findById(proyecto_id)
  const proyecto = {'id':_id,'nombre':nombre}
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
  const proyecto = await Proyecto.find();
    res.render('modelos-inversion/edit-inversion', { inversionista, iasociativo, proyecto })
};

asociativoCtrl.renderInmuebleAsociativo = async (req,res) => {
  const iasociativo = await Iasociativo.findById(req.params.id);
  const inversionista = await Inversionista.findById(iasociativo.inver_id);
    res.render('modelos-inversion/asociar-inmueble', { inversionista, iasociativo })
};

asociativoCtrl.renderInversionistaAsociativo = async (req,res) => {
  const iasociativo = await Iasociativo.findById(req.params.id);
  const inversionista = await Inversionista.findById(iasociativo.inver_id);
  const inversionistas = await Inversionista.find();
    res.render('modelos-inversion/asociar-inversionista', { inversionista, iasociativo, inversionistas })
};

asociativoCtrl.deleteInversionAsociativo = async (req, res) => {
  const iasociativo = await Iasociativo.findById(req.params.id);
  const inversionista = await Inversionista.findById(iasociativo.inver_id);
  await Iasociativo.findByIdAndDelete(req.params.id)
  req.flash('error_msg', 'Inversión eliminada');
  res.redirect('/ficha-i/' + inversionista._id)
}

asociativoCtrl.updateInversionAsociativo = async (req, res) => {
  const {
    proyecto_id,
    fecha_inicio,
    fecha_cierre,
    n_acciones,
    valor_compra,
    fecha_entrega_prometida,
    tir_prometida
  } = req.body;  
  const {_id,nombre} =await Proyecto.findById(proyecto_id)
  const proyecto = {'id':_id,'nombre':nombre}
  const iasociativo = await Iasociativo.findById(req.params.id)
   await Iasociativo.findByIdAndUpdate(req.params.id,{
    proyecto,
    fecha_inicio,
    fecha_cierre,
    n_acciones,
    valor_compra,
    fecha_entrega_prometida,
    tir_prometida
  })  
  req.flash('success_msg', 'Inversion actualizada')
  res.redirect('/ficha-inversion/' + iasociativo._id + '/asociativo')
}

asociativoCtrl.AsociarInmuebleAsociativo = async (req, res) => {
  const { inmuebles } = await Iasociativo.findById(req.params.id)
  const iasociativo = await Iasociativo.findById(req.params.id)
  const inmueble = req.body;
  inmueble.valor = Number(inmueble.valor)
  inmuebles.push(inmueble)
  await Iasociativo.findByIdAndUpdate(req.params.id, { inmuebles })
  req.flash('success_msg', 'Inmueble añadido')
  res.redirect('/ficha-inversion/'+ iasociativo._id+'/asociativo')
}

asociativoCtrl.AsociarInversionistaAsociativo = async (req, res) => {
  const { co_inversionista } = await Iasociativo.findById(req.params.id)
  const iasociativo = await Iasociativo.findById(req.params.id)
  const {_id,nombre, apellido} =await Inversionista.findById(req.body.co_inversionista)
  const inversionista = {'id':_id,'nombre':nombre + " " + apellido}
  co_inversionista.push(inversionista)
  await Iasociativo.findByIdAndUpdate(req.params.id, { co_inversionista })
  req.flash('success_msg', 'Inversionista añadido')
  res.redirect('/ficha-inversion/'+ iasociativo._id+'/asociativo')
}

asociativoCtrl.renderEditPPAsociativo = async (req,res) => {
  const iasociativo = await Iasociativo.findById(req.params.id);
  const inversionista = await Inversionista.findById(iasociativo.inver_id);
    res.render('modelos-inversion/edit-plan_pagos', { inversionista, iasociativo})
};

asociativoCtrl.agregarPagoAsociativo = async (req,res) => {
  res.send('Agregar pago')
};

asociativoCtrl.editarPPAsociativo = async (req,res) => {
  res.send('Actualizar PP')
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
