const {Schema, model} = require('mongoose');
const bcrypt = require("bcryptjs");


const userSchema=new Schema({
    nombre: {type: String, required: true},
    apellido: {type: String, required: true},
    telefono: {type: String, required: true},
    correo: {type: String, required: true},
    contrasena:{type: String, required:true},
    creado_en: { type: Date, default: Date.now},
},{timestamps:true
})


userSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  };
  
userSchema.methods.matchPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
  };

module.exports = model('Usuario', userSchema)