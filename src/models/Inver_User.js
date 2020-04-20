const { Schema, model } = require('mongoose');
const bcrypt = require("bcryptjs");


const userSchema = new Schema({
    nombre: { type: String },
    apellido: { type: String },
    celular: { type: Number },
    inver_id: { type: String },
    activo: { type: Boolean },
    correo: { type: String, required: true, unique: true },
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

module.exports = model('Inver_User', userSchema)