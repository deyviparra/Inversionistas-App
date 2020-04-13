const { Schema, model } = require('mongoose')

const inverSchema = new Schema({
  nombre: { type: String },
  apellido: { type: String },
  celular: { type: Number },
  telefono: { type: Number },
  correo: { type: String },
  cedula: { type: Number },
  direccion: { type: String },
  nacimiento: { type: String },
  estado_civil: { type: String },
  n_hijos: { type: String },
  n_mascotas: { type: String },
  hobby: { type: String },
  edad: { type: String },
  profesion: {type: String},
  empresa: {type: String},
  razon_social: {type: String},
  nit:{type: Number},
  imagePath: { type: String }
}, {
  timestamps: true
})

module.exports = model('Inversionista', inverSchema)