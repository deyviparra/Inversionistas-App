const { Schema, model } = require('mongoose')

const i_asociativoSchema = new Schema({
    inver_id: { type: String},
    proyecto: { type: String},
    fecha_inicio: { type: String},
    fecha_cierre:{type: String},
    n_acciones:{type: String},
    inmuebles:{type:Array},
    valor_compra:{type: String},
    fecha_entrega_prometida:{type: String},
    tir_prometida:{type: String},
    fecha_entrega_real:{type: String},
    tir_entrega_real:{type: String},
    plan_pagos:{type:Array},
    pagos_realizados:{type:Array}
  })
  
  module.exports = model('I_asociativo', i_asociativoSchema)