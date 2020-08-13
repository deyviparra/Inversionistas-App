const ifnfCtrl = {};
const path = require("path");
const { uploadFile } = require("../upload.js");
const Inversionista = require("../models/Inversionista");
const Proyecto = require("../models/Proyecto");
const Ifnf = require("../models/I_fnf");

const llenarPago = async (planPagos, pagosRealizados, garantia, pago) => {
  let completos = [];
  let indexpp =0;
  let indexStop=true;

  if (garantia === "true") {

    const arrGarantias = await pagosRealizados.filter(pago => {
      if(pago.garantia){
        return 1
      }
    })
    if(arrGarantias.length > 0){
      indexpp=arrGarantias.length - 1
    }

    if (pagosRealizados[indexpp]) {
      if (pagosRealizados[indexpp].garantia) {
        pago = Number(pago) + Number(pagosRealizados[indexpp].garantia);
      }
    }

    while (pago > planPagos[0].couta_garantia) {
      completos.push(planPagos[0].couta_garantia);
      pago = pago - planPagos[0].couta_garantia;
    }
    completos.push(pago);
    completos.forEach((element, index) => {
      if (pagosRealizados[indexpp + index]) {
        pagosRealizados[indexpp + index].garantia = element;
      } else {
        pagosRealizados[indexpp + index] = { garantia: element };
      }
    });
  } else {
    
    if (planPagos[0].couta_cliente > 0) {
      const arrClientes = await pagosRealizados.filter(pago => {
        if(pago.cliente){
          return 1
        }
      })
      if(arrClientes.length > 0){
        indexpp=arrClientes.length - 1
      }

      if (pagosRealizados[indexpp]) {
        if (pagosRealizados[indexpp].cliente) {
          pago = Number(pago) + Number(pagosRealizados[indexpp].cliente);
        }
      }

      while (
        pago >
        (Number(planPagos[0].couta_cliente) +
          Number(planPagos[0].couta_garantia)) *
          0.46
      ) {
        completos.push(
          (Number(planPagos[0].couta_cliente) +
            Number(planPagos[0].couta_garantia)) *
            0.46
        );
        // Revisar con el cliente si si es así el comportamiento del Plan de pagos para los pagos a el inversionista
        pago =
          pago -
          (Number(planPagos[0].couta_cliente) +
            Number(planPagos[0].couta_garantia)) *
            0.46;
      }
      completos.push(pago);
      completos.forEach((element, index) => {
        if (pagosRealizados[indexpp + index]) {
          pagosRealizados[indexpp + index].cliente = element;
        } else {
          pagosRealizados[indexpp + index] = { cliente: element };
        }
      });
    }
  }
  return pagosRealizados;
};

const checkPP = async (planPagos, pagosRealizados) => {
  let arrCheckCliente = [];
  let arrCheckGarantia = [];
  let saldoCliente = [];
  let saldoGarantia = [];
  const cuotaTotal = planPagos[0].couta_cliente + planPagos[0].couta_garantia;
  planPagos.forEach((element, index) => {
    if (element.couta_cliente > 0 && pagosRealizados[index]) {
      if (
        element.couta_cliente - cuotaTotal * 0.04 ===
        pagosRealizados[index].cliente
      ) {
        saldoCliente[index] = 0;
        arrCheckCliente[index] = "checked";
      } else {
        if (pagosRealizados[index].cliente) {
          saldoCliente[index] =
            element.couta_cliente -
            cuotaTotal * 0.04 -
            pagosRealizados[index].cliente;
        } else {
          saldoCliente[index] = element.couta_cliente;
        }
        arrCheckCliente[index] = "";
      }
    } else if (element.couta_cliente === 0) {
      saldoCliente[index] = element.couta_cliente;
      arrCheckCliente[index] = "checked";
    } else {
      saldoCliente[index] = element.couta_cliente;
      arrCheckCliente[index] = "";
    }
    if (pagosRealizados[index]) {
      if (element.couta_garantia === pagosRealizados[index].garantia) {
        saldoGarantia[index] =
          element.couta_garantia - pagosRealizados[index].garantia;
        arrCheckGarantia[index] = "checked";
      } else {
        if (pagosRealizados[index].garantia) {
          saldoGarantia[index] =
            element.couta_garantia - pagosRealizados[index].garantia;
        } else {
          saldoGarantia[index] = element.couta_garantia;
        }
        arrCheckGarantia[index] = "";
      }
    } else {
      saldoGarantia[index] = element.couta_garantia;
      arrCheckGarantia[index] = "";
    }
  });
  return [arrCheckCliente, arrCheckGarantia, saldoCliente, saldoGarantia];
};

const cumplimiento = async (valorMutuo, valorActual, valorCompra, meta) => {
  const valorizacion = valorActual - valorCompra;
  const estado = (valorizacion / meta) * 100;

  const cumplimiento = await Math.round(estado);

  return cumplimiento;
};

const crearFechacierre = fecha_inicio => {
  try {
    let inicio = fecha_inicio.split("-");
    inicio[0] = parseInt(inicio[0]) + 2;
    inicio[0] = String(inicio[0]);
    let cierre = new Date(inicio[0], inicio[1] - 1, inicio[2]);

    let ano = cierre.getFullYear();
    let mes = cierre.getMonth() + 1;
    let dia = cierre.getDate();
    let fecha = ano + "-" + mes + "-" + dia;

    return fecha;
  } catch {
    console.log("No es posible crear la fecha de cierre");
  }
};

const crearPlan_pagos = (
  fecha_inicio,
  tasa_interes,
  porcentaje_cliente,
  porcentaje_garantia,
  fecha_pago,
  valor_mutuo
) => {
  try {
    let inicio = fecha_inicio.split("-");
    let inicio_date = new Date(inicio[0], inicio[1] - 1, inicio[2]);
    let plan_pagos = [];
    let tasa = Number(tasa_interes) / 100;
    let porcentaje_c = Number(porcentaje_cliente) / 100;
    let porcentaje_g = Number(porcentaje_garantia) / 100;
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

      let couta_cliente = valor * tasa * porcentaje_c;
      let couta_garantia = valor * tasa * porcentaje_g;

      plan_pagos[i] = { fecha, couta_cliente, couta_garantia };

      inicio[1] = parseInt(inicio[1]) + 1;
      inicio[1] = String(inicio[1]);
    }
    return plan_pagos;
  } catch {
    console.log("No es posible crear el plan de pagos");
  }
};

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
    const { _id, nombre } = await Proyecto.findById(proyecto_id);
    const proyecto = { id: _id, nombre: nombre };
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
    newFnf.fecha_cierre = crearFechacierre(fecha_inicio);
    newFnf.plan_pago_intereses = crearPlan_pagos(
      fecha_inicio,
      tasa_interes,
      porcentaje_cliente,
      porcentaje_garantia,
      fecha_pago,
      valor_mutuo
    );
    await newFnf.save();
    req.flash("success_msg", "Inversión creada");
    res.redirect("/ficha-i/" + inver_id);
  } catch (e) {
    req.flash("error_msg", "No es posible crear la inversión");
    res.redirect("/ficha-i/" + inver_id);
    console.log(e);
  }
};

ifnfCtrl.renderFichaInvFnf = async (req, res) => {
  try {
    const ifnf = await Ifnf.findById(req.params.id);
    const meta = ifnf.valor_mutuo * 0.2;
    const proyecto = await Proyecto.findById(ifnf.proyecto.id);
    const inversionista = await Inversionista.findById(ifnf.inver_id);
    const backUrl = "/ficha-i/" + ifnf.inver_id;

    const arrsCheck = await checkPP(
      ifnf.plan_pago_intereses,
      ifnf.pago_realizado_intereses
    );
    ifnf.plan_pago_intereses.forEach((element, index) => {
      element.arrCheckCliente = arrsCheck[0][index];
      element.arrCheckGarantia = arrsCheck[1][index];
      element.saldoCliente = arrsCheck[2][index];
      element.saldoGarantia = arrsCheck[3][index];
    });
    if (typeof ifnf.inmuebles[0] != "undefined") {
      var porcentajeCumplimiento = await cumplimiento(
        ifnf.valor_mutuo,
        proyecto.rango,
        ifnf.inmuebles[0].valor,
        meta
      );
    } else {
      var porcentajeCumplimiento = "Debes asociar un inmueble a esta inversión";
    }
    res.render("modelos-inversion/ficha-inversion", {
      inversionista,
      ifnf,
      backUrl,
      proyecto,
      porcentajeCumplimiento,
      meta
    });
  } catch (e) {
    const ifnf = await Ifnf.findById(req.params.id);
    const inversionista = await Inversionista.findById(ifnf.inver_id);
    req.flash("error_msg", "No es posible visualizar la inversión");
    res.redirect("/ficha-i/" + inversionista._id);
    console.log(e);
  }
};

ifnfCtrl.renderEditInvFnf = async (req, res) => {
  try {
    const ifnf = await Ifnf.findById(req.params.id);
    const inversionista = await Inversionista.findById(ifnf.inver_id);
    const proyecto = await Proyecto.find();
    const backUrl = "/ficha-inversion/" + ifnf._id + "/fnf";
    res.render("modelos-inversion/edit-inversion", {
      inversionista,
      ifnf,
      proyecto,
      backUrl
    });
  } catch (e) {
    const ifnf = await Ifnf.findById(req.params.id);
    req.flash("error_msg", "No es posible modificar la inversión");
    res.redirect("/ficha-inversion/" + ifnf._id + "/fnf");
    console.log(e);
  }
};

ifnfCtrl.renderInmuebleFnf = async (req, res) => {
  try {
    const ifnf = await Ifnf.findById(req.params.id);
    const inversionista = await Inversionista.findById(ifnf.inver_id);
    const backUrl = "/ficha-inversion/" + ifnf._id + "/fnf";
    res.render("modelos-inversion/asociar-inmueble", {
      inversionista,
      ifnf,
      backUrl
    });
  } catch (e) {
    const ifnf = await Ifnf.findById(req.params.id);
    req.flash("error_msg", "No es posible asociar inmueble");
    res.redirect("/ficha-inversion/" + ifnf._id + "/fnf");
    console.log(e);
  }
};

ifnfCtrl.renderInversionistaFnf = async (req, res) => {
  try {
    const ifnf = await Ifnf.findById(req.params.id);
    const inversionista = await Inversionista.findById(ifnf.inver_id);
    const inversionistas = await Inversionista.find();
    const backUrl = "/ficha-inversion/" + ifnf._id + "/fnf";
    res.render("modelos-inversion/asociar-inversionista", {
      inversionista,
      ifnf,
      inversionistas,
      backUrl
    });
  } catch (e) {
    const ifnf = await Ifnf.findById(req.params.id);
    req.flash("error_msg", "No es posible asociar Co-inversionista");
    res.redirect("/ficha-inversion/" + ifnf._id + "/fnf");
    console.log(e);
  }
};

ifnfCtrl.deleteInversionFnf = async (req, res) => {
  try {
    const ifnf = await Ifnf.findById(req.params.id);
    const inversionista = await Inversionista.findById(ifnf.inver_id);
    await Ifnf.findByIdAndDelete(req.params.id);
    req.flash("error_msg", "Inversión eliminada");
    res.redirect("/ficha-i/" + inversionista._id);
  } catch (e) {
    const ifnf = await Ifnf.findById(req.params.id);
    req.flash("error_msg", "La inversión no pudo ser eliminada");
    res.redirect("/ficha-inversion/" + ifnf._id + "/fnf");
    console.log(e);
  }
};

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
    const { _id, nombre } = await Proyecto.findById(proyecto_id);
    const proyecto = { id: _id, nombre: nombre };
    const ifnf = await Ifnf.findById(req.params.id);
    await Ifnf.findByIdAndUpdate(req.params.id, {
      proyecto,
      fecha_inicio,
      lega_mutuo_fidu,
      valor_mutuo,
      observaciones,
      tasa_interes
    });
    req.flash("success_msg", "Inversion actualizada");
    res.redirect("/ficha-inversion/" + ifnf._id + "/fnf");
  } catch (e) {
    const ifnf = await Ifnf.findById(req.params.id);
    req.flash("error_msg", "La inversión no pudo ser actualizada");
    res.redirect("/ficha-inversion/" + ifnf._id + "/fnf");
    console.log(e);
  }
};

ifnfCtrl.AsociarInmuebleFnf = async (req, res) => {
  try {
    const { inmuebles } = await Ifnf.findById(req.params.id);
    const ifnf = await Ifnf.findById(req.params.id);
    const inmueble = req.body;
    inmueble.valor = Number(inmueble.valor);
    inmuebles.push(inmueble);
    await Ifnf.findByIdAndUpdate(req.params.id, { inmuebles });
    req.flash("success_msg", "Inmueble añadido");
    res.redirect("/ficha-inversion/" + ifnf._id + "/fnf");
  } catch (e) {
    const ifnf = await Ifnf.findById(req.params.id);
    req.flash("error_msg", "El inmueble no pudo ser añadido");
    res.redirect("/ficha-inversion/" + ifnf._id + "/fnf");
    console.log(e);
  }
};

//-----------------------------------------------------------------------------------

ifnfCtrl.EliminarInmuebleFnf = async (req, res) => {
  try {
    let { inmuebles, id } = await Ifnf.findById(req.params.id);
    const arr1 = inmuebles.slice(0, req.params.index);
    const arr2 = inmuebles.slice(
      Number(req.params.index) + 1,
      inmuebles.length + 1
    );
    inmuebles = arr1.concat(arr2);
    await Ifnf.findByIdAndUpdate(req.params.id, {
      inmuebles
    });
    req.flash("success_msg", "Inmueble eliminado");
    res.send(["/ficha-inversion/" + id + "/fnf"]);
  } catch (e) {
    console.log(e);
  }
};

ifnfCtrl.EliminarCoInverFnf = async (req, res) => {
  try {
    let { co_inversionista, id } = await Ifnf.findById(req.params.id);
    const arr1 = co_inversionista.slice(0, req.params.index);
    const arr2 = co_inversionista.slice(
      Number(req.params.index) + 1,
      co_inversionista.length + 1
    );
    co_inversionista = arr1.concat(arr2);
    console.log(co_inversionista);
    await Ifnf.findByIdAndUpdate(req.params.id, {
      co_inversionista
    });
    req.flash("success_msg", "Co-inversionista eliminado");
    res.send(["/ficha-inversion/" + id + "/fnf"]);
  } catch (e) {
    console.log(e);
  }
};
//-----------------------------------------------------------------------------------

ifnfCtrl.AsociarInversionistaFnf = async (req, res) => {
  try {
    const { co_inversionista } = await Ifnf.findById(req.params.id);
    const ifnf = await Ifnf.findById(req.params.id);
    const { _id, nombre, apellido } = await Inversionista.findById(
      req.body.co_inversionista
    );
    const inversionista = { id: _id, nombre: nombre + " " + apellido };
    co_inversionista.push(inversionista);
    await Ifnf.findByIdAndUpdate(req.params.id, { co_inversionista });
    req.flash("success_msg", "Inversionista añadido");
    res.redirect("/ficha-inversion/" + ifnf._id + "/fnf");
  } catch (e) {
    const ifnf = await Ifnf.findById(req.params.id);
    req.flash("error_msg", "El Co-inversionista no pudo ser añadido");
    res.redirect("/ficha-inversion/" + ifnf._id + "/fnf");
    console.log(e);
  }
};

ifnfCtrl.renderEditPPFnf = async (req, res) => {
  const ifnf = await Ifnf.findById(req.params.id);
  const inversionista = await Inversionista.findById(ifnf.inver_id);
  const backUrl = "/ficha-inversion/" + ifnf._id + "/fnf";
  const arrsCheck = await checkPP(
    ifnf.plan_pago_intereses,
    ifnf.pago_realizado_intereses
  );
  ifnf.plan_pago_intereses.forEach((element, index) => {
    element.arrCheckCliente = arrsCheck[0][index];
    element.arrCheckGarantia = arrsCheck[1][index];
    element.saldoCliente = arrsCheck[2][index];
    element.saldoGarantia = arrsCheck[3][index];
  });
  res.render("modelos-inversion/edit-plan_pagos", {
    inversionista,
    ifnf,
    backUrl
  });
};

ifnfCtrl.renderAgregarPagoFnf = async (req, res) => {
  const ifnf = await Ifnf.findById(req.params.id);
  let garantia = await req.query.garantia;
  const backUrl = "/edit-plan_pagos/" + ifnf._id + "/fnf";
  !garantia ? (garantia = "false") : (garantia = "true");
  res.render("modelos-inversion/agregar-pago", {
    ifnf,
    garantia,
    backUrl
  });
};

ifnfCtrl.agregarPagoFnf = async (req, res) => {
  const ifnf = await Ifnf.findById(req.params.id);
  let garantia = req.body.garantia;
  const planDePagos = ifnf.plan_pago_intereses;
  const pagosRealizados = ifnf.pago_realizado_intereses;
  const pago = req.body.pago;
  const fecha = req.body.fecha;
  let historial = [];
  let destino;
  let recibo = "";

  if (typeof req.file === "undefined") {
  } else {
    recibo =
      "https://inversionistas-bucket.s3-sa-east-1.amazonaws.com/" +
      req.file.filename;
    await uploadFile(
      path.join(__dirname, "../public/uploads/" + req.file.filename),
      req.file.filename
    );
  }

  if (pagosRealizados[0]) {
    if (pagosRealizados[0].historial) {
      historial = pagosRealizados[0].historial;
    }
  }

  garantia === "true" ? (destino = "garantia") : (destino = "cliente");

  const newPagoRealizado = await llenarPago(
    planDePagos,
    pagosRealizados,
    garantia,
    pago
  );

  historial.push({
    fecha: fecha,
    valor: pago,
    recibo: recibo,
    destino: destino
  });
  newPagoRealizado[0].historial = historial;
  ifnf.pago_realizado_intereses =  newPagoRealizado;

  await Ifnf.findOneAndUpdate({ _id: ifnf.id }, ifnf);
  res.redirect("/edit-plan_pagos/" + ifnf.id + "/fnf");
};

ifnfCtrl.editarPPFnf = async (req, res) => {
  res.send("Actualizar PP");
};

module.exports = ifnfCtrl;
