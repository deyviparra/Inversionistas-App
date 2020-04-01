const { Schema, model } = require("mongoose");

const i_compraSchema = new Schema({
  inver_id: { type: String },
  proyecto: { type: String },
  fecha_inicio: { type: String },
  fecha_cierre: { type: String },
  n_encargo_fidu: { type: String },
  valor_compra: { type: String },
  fecha_entrega_prometida: { type: String },
  tir_prometida: { type: String },
  inmuebles:{type:Array},
  fecha_entrega_real: { type: String },
  tir_entrega_real: { type: String },
  plan_pagos: { type: Array },
  pagos_realizados: { type: Array }
});

module.exports = model("I_compra", i_compraSchema);
