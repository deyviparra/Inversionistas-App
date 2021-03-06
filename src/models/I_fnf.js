const { Schema, model } = require('mongoose')

const i_fnfSchema = new Schema({
  inver_id: { type: String},
  proyecto: { type: Object},
  co_inversionista: { type: Array},
  fecha_inicio: { type: String},
  fecha_cierre:{type: String},
  inmuebles:{type:Array},
  lega_mutuo_fidu:{type:String},
  valor_mutuo:{type: Number},
  observaciones:{type: String},
  tasa_interes:{type: Number},
  tasa_anual:{type: Number},
  plan_pago_intereses:{type: Array},
  pago_realizado_intereses:{type: Array},
  porcentaje_cliente:{type: Number},
  porcentaje_garantia:{type: Number},
  valorizacion_20_mutuo:{type: Number},
  valor_comercial:{type: Number}
  })
  
  module.exports = model('I_fnf', i_fnfSchema)