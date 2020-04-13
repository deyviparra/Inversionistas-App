const { Schema, model } = require("mongoose");

const i_compraSchema = new Schema({
  inver_id: { type: String },
  proyecto: { type: Object },
  co_inversionista: { type: Array},
  inmuebles:{type:Array},
  fecha_inicio: { type: String },
  fecha_cierre: { type: String },
  valor_compra: { type: Number },
  fecha_entrega_prometida: { type: String },
  tir_prometida: { type: Number },
  fecha_entrega_real: { type: String },
  tir_entrega_real: { type: String },
  plan_pagos: { type: Array },
  pagos_realizados: { type: Array }
});

module.exports = model("I_compra", i_compraSchema);
