const { Schema, model } = require('mongoose')

const inverSchema = new Schema({
  nombre: { type: String },
  apellido: { type: String },
  telefono: { type: String },
  correo: { type: String },
  cedula: { type: String },
  direccion: { type: String },
  nacimiento: { type: String },
  estado_civil: { type: String },
  n_hijos: { type: String },
  n_mascotas: { type: String },
  hobby: { type: String },
  edad: { type: String },
  profesion: {type: String},
  imagePath: { type: String }
}, {
  timestamps: true
})

module.exports = model('Inversionista', inverSchema)