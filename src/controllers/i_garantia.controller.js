const igarantiaCtrl = {}
const Inversionista = require("../models/Inversionista");
const Proyecto = require("../models/Proyecto");
const Igarantia = require("../models/I_garantia");

igarantiaCtrl.createIgarantia = async (req, res) => {

    const inver_id = req.params.id;
    const { proyecto,
        fecha_inicio,
        // fecha_cierre,
        duracion,
        periodo_liquidacion,
        valor_inversion,
        tasa_int_men
        // tasa_int_anual
        // fecha_pago 
    } = req.body;
    const newIgarantia = new Igarantia({
        inver_id,
        proyecto,
        fecha_inicio,
        duracion,
        // fecha_cierre,
        periodo_liquidacion,
        valor_inversion,
        tasa_int_men
        // tasa_int_anual
    })
    let fecha_pago=19
    // newIgarantia.tasa_int_anual = Number(tasa_int_men)*12
    newIgarantia.plan_pago_intereses = crearPlan_pagos(fecha_inicio, tasa_int_men, fecha_pago, valor_inversion, periodo_liquidacion, duracion);
    newIgarantia.pagos_realizados = new Array(newIgarantia.plan_pago_intereses.length)
    await newIgarantia.save();
    req.flash('success_msg', 'Inversión creada')
    res.redirect('/ficha-i/' + req.params.id)
}

igarantiaCtrl.renderFichaInvGarantia = async (req, res) => {
    const igarantia = await Igarantia.findById(req.params.id)
    const inversionista = await Inversionista.findById(igarantia.inver_id)
    res.render('modelos-inversion/ficha-inversion', { inversionista, igarantia })
}

igarantiaCtrl.renderEditInvGarantia = async (req,res) => {
    const igarantia = await Igarantia.findById(req.params.id)
    const inversionista = await Inversionista.findById(igarantia.inver_id)
    const proyecto = await Proyecto.find();
    res.render('modelos-inversion/edit-inversion', { inversionista, igarantia, proyecto })
  };

igarantiaCtrl.renderInversionistaGarantia = async (req,res) => {
    const igarantia = await Igarantia.findById(req.params.id)
    const inversionista = await Inversionista.findById(igarantia.inver_id)
    const inversionistas = await Inversionista.find();
      res.render('modelos-inversion/asociar-inversionista', { inversionista, igarantia, inversionistas })
  };

igarantiaCtrl.deleteInversionGarantia = async (req, res) => {
    const igarantia = await Igarantia.findById(req.params.id)
    const inversionista = await Inversionista.findById(igarantia.inver_id)
    await Igarantia.findByIdAndDelete(req.params.id)
    req.flash('error_msg', 'Inversión eliminada');
    res.redirect('/ficha-i/' + inversionista._id)
  }

igarantiaCtrl.updateInversionGarantia = async (req, res) => {
    console.log(req.params.id)
    const {proyecto,
        fecha_inicio,
        duracion,
        periodo_liquidacion,
        valor_inversion,
        tasa_int_men
    } = req.body;  
    const igarantia = await Igarantia.findById(req.params.id)
    const inversionista = await Inversionista.findById(igarantia.inver_id);
     await Igarantia.findByIdAndUpdate(req.params.id,{
        proyecto,
        fecha_inicio,
        duracion,
        periodo_liquidacion,
        valor_inversion,
        tasa_int_men
    })  
    req.flash('success_msg', 'Inversion actualizada')
    res.redirect('/ficha-i/' + inversionista._id)
  }

igarantiaCtrl.AsociarInversionistaGarantia = async (req, res) => {
    const { co_inversionista } = await Igarantia.findById(req.params.id)
    const igarantia = await Igarantia.findById(req.params.id)
    const inversionista = req.body;
    co_inversionista.push(inversionista)
    await Igarantia.findByIdAndUpdate(req.params.id, { co_inversionista })
    req.flash('success_msg', 'Inversionista añadido')
    res.redirect('/ficha-inversion/'+ igarantia._id+'/garantia')
  }

igarantiaCtrl.renderEditPPGarantia = async (req,res) => {
    const igarantia = await Igarantia.findById(req.params.id);
    const inversionista = await Inversionista.findById(igarantia.inver_id);
      res.render('modelos-inversion/edit-plan_pagos', { inversionista, igarantia })
  };

igarantiaCtrl.agregarPagoGarantia = async (req,res) => {
    res.send('Agregar pago')
  };
  
igarantiaCtrl.editarPPGarantia = async (req,res) => {
    res.send('Actualizar PP')
  };
  

function crearPlan_pagos(fecha_inicio, tasa_int_men, fecha_pago, valor_inversiono, periodo_liquidacion,duracion) {
    let inicio = fecha_inicio.split("-");
    let inicio_date = new Date(inicio[0], inicio[1] - 1, inicio[2]);
    let meses = Number(duracion);
    let periodo = parseInt(periodo_liquidacion);
    let tasa = (Number(tasa_int_men) / 100) + 1;
    let valor = Number(valor_inversiono);

    let plan_pagos = []
    let fecha_ant = 0;
    let dias = 0;

    for (let i = 0; i < meses / periodo; i++) {
        if (i == 0) {
            fecha_ant = new Date(inicio[0], inicio[1] - 1,inicio[2]);
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

        plan_pagos[i] = { fecha, couta};

        inicio[1] = parseInt(inicio[1]) + periodo;
        inicio[1] = String(inicio[1]);
    }
    return plan_pagos;
}
module.exports = igarantiaCtrl;