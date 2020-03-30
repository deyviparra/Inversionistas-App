const userCtrl = {}
const passport = require('passport')
const User = require('../models/Usuario')


userCtrl.renderRegistro = (req, res) => {
    res.render('usuarios/registro')
}

userCtrl.registro = async (req, res) => {
    const errors = []
    const { nombre, apellido, correo, telefono, contrasena, confirm_contrasena } = req.body
    if (contrasena != confirm_contrasena) {
        errors.push({ text: 'Las contraseñas no coinciden' })
    }
    if (errors.length > 0) {
        res.render('usuarios/registro', {
            errors, nombre, apellido, correo, telefono
        })
    } else {
        const emailUser = await User.findOne({ correo: correo });
        if (emailUser) {
            req.flash('error_msg', 'El correo ya esta en uso')
            res.redirect('/usuarios/registro')
        } else {
            const newUsuario = new User({ nombre, apellido, telefono, correo, contrasena })
            newUsuario.contrasena = await newUsuario.encryptPassword(contrasena);
            await newUsuario.save();
            req.flash('success_msg', 'Usuario creado con exito')
            res.redirect('../menuppal');
        }
        res.send('registro exitoso')
    }
}
userCtrl.renderLogin = (req, res) => {
    res.render('usuarios/login')
}

userCtrl.login = passport.authenticate('local', {
    successRedirect: '../menuppal',
    failureRedirect: '/usuarios/login',
    failureFlash: true
})

userCtrl.logout = (req, res) => {
    req.logout()
    req.flash('success_msg', 'Ha cerrado sesión')
    res.redirect('/')
}

userCtrl.renderFichaU = (req, res) => {
    res.render('usuarios/perfil')
}

userCtrl.renderEditFormUser=async (req,res)=>{
    const user = await User.findById(req.params.id)
     res.render('usuarios/edit-user',{user})
 }

userCtrl.updateUser=async (req,res)=>{
    const {nombre,apellido,telefono,correo}=req.body;
    await User.findByIdAndUpdate(req.params.id, {nombre,apellido,telefono,correo} )
        req.flash('success_msg', 'Usuario actualizado')
        res.redirect('/menuppal')
    }

module.exports = userCtrl