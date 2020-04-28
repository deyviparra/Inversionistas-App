const inveruserCtrl = {};
const passport = require('passport');
const InverUser = require('../models/Inver_User');
const Inversionista = require("../models/Inversionista");



inveruserCtrl.NewInverAsUser = async (req, res) => {
    try {
        const inver = await Inversionista.findById(req.params.id);
        const user = await InverUser.findOne({ inver_id: inver.id });
        if (user) {
            if (user.activo == true) {
                req.flash('success_msg', 'Usuario habilitado')
                res.redirect("inversionistas/ficha-i/" + inver._id);
            } else {
                const activo = true;
                await InverUser.findByIdAndUpdate(user.id, { activo });
                req.flash('success_msg', 'Usuario habilitado')
                res.redirect("inversionistas/ficha-i/" + inver._id);
            }
        } else {
            const nombre = inver.nombre;
            const apellido = inver.apellido;
            const celular = inver.celular;
            const inver_id = inver._id;
            const activo = true;
            const correo = inver.correo;
            const contrasena = "1"; //falta generar contraseña
            const newUsuario = new InverUser({ nombre, apellido, celular, inver_id, activo, correo, contrasena });
            //newUsuario.contrasena = await newUsuario.encryptPassword(contrasena);
            await newUsuario.save();
            req.flash('success_msg', 'Usuario habilitado');
            res.redirect("inversionistas/ficha-i/" + inver._id);
        }
    }
    catch (e) {
        const inver = await Inversionista.findById(req.params.id);
        req.flash('error_msg', 'El usuario no pudo ser habilitado')
        res.redirect("inversionistas/ficha-i/" + inver._id);
        console.log(e);
    }
}
inveruserCtrl.RemoveInverAsUser = async (req, res) => {
    try {
        const inver = await Inversionista.findById(req.params.id);
        const user = await InverUser.findOne({ inver_id: inver.id });
        if (user) {
            if (user.activo == true) {
                const activo = false;
                await InverUser.findByIdAndUpdate(user.id, { activo });
                req.flash('success_msg', 'Usuario deshabilitado')
                res.redirect("inversionistas/ficha-i/" + inver._id);
            }
        }
    }
    catch (e) {
        const inver = await Inversionista.findById(req.params.id);
        req.flash('error_msg', 'El usuario no pudo ser deshabilitado')
        res.redirect("inversionistas/ficha-i/" + inver._id);
        console.log(e);
    }
}

module.exports = inveruserCtrl