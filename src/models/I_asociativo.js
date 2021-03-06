const { Schema, model } = require('mongoose')

const i_asociativoSchema = new Schema({
    inver_id: { type: String},
    proyecto: { type: Object},
    co_inversionista: { type: Array},
    fecha_inicio: { type: String},
    fecha_cierre:{type: String},
    n_acciones:{type: String},
    inmuebles:{type:Array},
    valor_compra:{type: Number},
    fecha_entrega_prometida:{type: String},
    tir_prometida:{type: Number},
    fecha_entrega_real:{type: String},
    tir_entrega_real:{type: Number},
    plan_pagos:{type:Array},
    pagos_realizados:{type:Array}
  })
  
  module.exports = model('I_asociativo', i_asociativoSchema)