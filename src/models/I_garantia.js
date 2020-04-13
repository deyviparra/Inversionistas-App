const { Schema, model } = require('mongoose')

const i_garantiaSchema = new Schema({
  inver_id: { type: String },
  proyecto: { type: Object },
  co_inversionista: { type: Array },
  inmuebles: { type: Array },
  fecha_inicio: { type: String },
  duracion: { type: String },
  fecha_cierre: { type: String },
  periodo_liquidacion: { type: String },
  valor_inversion: { type: Number },
  tasa_int_men: { type: Number },
  tasa_int_anual: { type: Number },
  plan_pago_intereses: { type: Array },
  pagos_realizados: { type: Array }
})

module.exports = model('I_garantia', i_garantiaSchema)