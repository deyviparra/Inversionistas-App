const { Schema, model } = require('mongoose')

const i_fnfSchema = new Schema({
  inver_id: { type: String},
  proyecto: { type: String},
  fecha_inicio: { type: String},
  fecha_cierre:{type: String},
  inmuebles:{type:Array},
  periodo_liquidacion:{type:String},
  lega_mutuo_fidu:{type:String},
  valor_mutuo:{type: String},
  tasa_interes:{type: String},
  tasa_anual:{type: String},
  pago_intereses_mensual:{type: Array},
  pago_intereses_garantia:{type: Array},
  porcentaje_cliente:{type: String},
  porcentaje_garantia:{type: String},
  valorizacion_20_mutuo:{type: String},
  valor_comercial:{type: String}
  })
  
  module.exports = model('I_fnf', i_fnfSchema)