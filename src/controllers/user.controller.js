const userCtrl = {}
const passport = require('passport')
const User = require('../models/Usuario')

userCtrl.renderRegistro = (req, res) => {
    try{
        res.render('usuarios/registro')
    }
    catch (e) {
        req.flash('error_msg', 'No se puede crear usuario')
        res.redirect('/menuppal');
        console.log(e);
      }
}

userCtrl.registro = async (req, res) => {
    try{
        console.log(req.body)
        const errors = []
        const { nombre, apellido, correo, celular, modificar, informes, contrasena, confirm_contrasena } = req.body
        if (contrasena != confirm_contrasena) {
            errors.push({ text: 'Las contraseñas no coinciden' })
        }
        if (errors.length > 0) {
            res.render('usuarios/registro', {
                errors, nombre, apellido, correo, celular
            })
        } else {
            const emailUser = await User.findOne({ correo: correo });
            if (emailUser) {
                req.flash('error_msg', 'El correo ya esta en uso')
                res.redirect('/usuarios/registro')
            } else {
                const newUsuario = new User({ nombre, apellido, celular, modificar, informes, correo, contrasena })
                newUsuario.contrasena = await newUsuario.encryptPassword(contrasena);
                await newUsuario.save();
                req.flash('success_msg', 'Usuario creado con exito')
                res.redirect('../menuppal');
            }
            res.send('registro exitoso')
        }
    }
    catch (e) {
        req.flash('error_msg', 'No se pudo crear el usuario')
        res.redirect('/menuppal');
        console.log(e);
      }
}

userCtrl.renderLogin = (req, res) => {
    try{
        res.render('usuarios/login')
    }
    catch (e) {
        req.flash('error_msg', 'No se puede iniciar sesión')
        res.redirect('/');
        console.log(e);
      }
}

userCtrl.login = passport.authenticate('local', {
    successRedirect: '../menuppal',
    failureRedirect: '/usuarios/login',
    failureFlash: true
})

userCtrl.logout = (req, res) => {
    try{
        req.logout()
        req.flash('success_msg', 'Ha cerrado sesión')
        res.redirect('/')
    }
    catch (e) {
        req.flash('error_msg', 'No se pudo cerrar sesión')
        res.redirect('/menuppal');
        console.log(e);
      }
}

userCtrl.renderFichaU = (req, res) => {
    try{
        res.render('usuarios/perfil')
    }
    catch (e) {
        req.flash('error_msg', 'No se puede visualizar el usuario')
        res.redirect('/menuppal');
        console.log(e);
      }
}

userCtrl.renderEditFormUser = async (req, res) => {
    try{
        const user = await User.findById(req.params.id)
        res.render('usuarios/edit-user', { user })
    }
    catch (e) {
        req.flash('error_msg', 'No se puede actualizar el usuario')
        res.redirect('/menuppal');
        console.log(e);
      }
}

userCtrl.updateUser = async (req, res) => {
    try{
        const { nombre, apellido, celular, correo } = req.body;
        await User.findByIdAndUpdate(req.params.id, { nombre, apellido, celular, correo })
        req.flash('success_msg', 'Usuario actualizado')
        res.redirect('/menuppal')
    }
        catch (e) {
        req.flash('error_msg', 'No se pudo actualizar el usuario')
        res.redirect('/menuppal');
        console.log(e);
      }
}

module.exports = userCtrl