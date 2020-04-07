const { Schema, model } = require('mongoose')

const i_fnfSchema = new Schema({
  inver_id: { type: String},
  proyecto: { type: Object},
  co_inversionista: { type: Array},
  fecha_inicio: { type: String},
  fecha_cierre:{type: String},
  inmuebles:{type:Array},
  lega_mutuo_fidu:{type:String},
  valor_mutuo:{type: String},
  observaciones:{type: String},
  tasa_interes:{type: String},
  tasa_anual:{type: String},
  plan_pago_intereses:{type: Array},
  pago_realizado_intereses:{type: Array},
  porcentaje_cliente:{type: String},
  porcentaje_garantia:{type: String},
  valorizacion_20_mutuo:{type: String},
  valor_comercial:{type: String}
  })
  
  module.exports = model('I_fnf', i_fnfSchema)