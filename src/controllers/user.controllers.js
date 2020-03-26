const userCtrl = {}
const passport = require('passport')
const User = require('../models/Usuario')


userCtrl.renderRegistro = (req,res)=>{
    res.render('usuarios/registro')
}

userCtrl.registro=async (req,res)=>{
    const errors = []
    const {nombre,apellido,correo,telefono,contrasena,confirm_contrasena}=req.body
    if (contrasena!=confirm_contrasena){
        errors.push({text: 'Las contraseñas no coinciden'})
    }
    if(errors.length>0){
        res.render('usuarios/registro',{
            errors,nombre,apellido,correo,telefono
        })
    }else{
        const emailUser = await User.findOne({correo:correo});
     if(emailUser){
     req.flash('error_msg','El correo ya esta en uso')  
     res.redirect('/usuarios/registro')   
    } else {
       const newUsuario= new User({nombre,apellido,telefono,correo,contrasena})
     newUsuario.contrasena = await newUsuario.encryptPassword(contrasena);
     await newUsuario.save();
     req.flash('success_msg','Usuario creado con exito')
     res.redirect('../menuppal');
  }
        res.send('registro exitoso')
    }
}
userCtrl.renderLogin = (req,res)=>{

    res.render('usuarios/login')
}

userCtrl.login = passport.authenticate('local',{
    successRedirect: '../menuppal',
    failureRedirect: '/usuarios/login',
    badRequestMessage: 'Your message you want to change.',
    failureFlash:true
})

userCtrl.logout=(req,res)=>{
    req.logout()
    req.flash('success_msg','ha cerrado sesión')
    res.redirect('./usuarios/login')
}

module.exports = userCtrl