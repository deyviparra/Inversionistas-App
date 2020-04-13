const { Schema, model } = require('mongoose');
const bcrypt = require("bcryptjs");


const userSchema = new Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  celular: { type: Number, required: true },
  correo: { type: String, required: true, unique: true },
  modificar: { type: String},
  informes: { type: String},
  super_usuario: { type: String},
  contrasena: { type: String, required: true }
}, {
  timestamps: true
})


userSchema.methods.encryptPassword = async (contrasena) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(contrasena, salt);
};

userSchema.methods.matchPassword = async function (contrasena) {
  return await bcrypt.compare(contrasena, this.contrasena);
};

module.exports = model('Usuario', userSchema)