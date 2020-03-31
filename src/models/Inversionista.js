const { Schema, model } = require('mongoose')

const inverSchema = new Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  telefono: { type: String, required: true },
  correo: { type: String, required: true },
  cedula: { type: String, required: true },
  direccion: { type: String },
  nacimiento: { type: String },
  estado_civil: { type: String },
  n_hijos: { type: String },
  n_mascotas: { type: String },
  hobby: { type: String },
  edad: { type: String },
  imagePath: { type: String },
  inversiones: { type: Array },
}, {
  timestamps: true
})

module.exports = model('Inversionista', inverSchema)