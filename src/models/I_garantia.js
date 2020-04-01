const { Schema, model } = require('mongoose')

const i_garantiaSchema = new Schema({
  inver_id: { type: String },
  proyecto: { type: String },
  inmuebles: { type: String },
  fecha_inicio: { type: String },
  fecha_cierre: { type: String },
  periodo_liq: { type: String },
  valor_inversion: { type: String},
  tasa_int_men: { type: String},
  tasa_int_anual: { type: String },
  periodo_int: { type: String },
  fechas_pago_int: { type: Array }
})

module.exports = model('I_garantia', i_garantiaSchema)