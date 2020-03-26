const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Usuario = require('../models/Usuario')

passport.use(new LocalStrategy({
    usernameField: 'correo',
    passwordField: 'contrasena'
}, async(correo,contrasena,done)=>{
    const usuario = await Usuario.findOne({correo});
    if(!usuario){
        return done(null, false,{message:'No se encuentra el usuario'});
    } else{
       const match = await usuario.matchPassword(contrasena);
       if(match){
           return done(null,usuario);
       } else {
           return done(null,false,{message: 'Contraseña inválida'});
       }
    }
}));

passport.serializeUser((usuario,done)=>{
    done(null,usuario.id);
});

passport.deserializeUser((id,done)=>{
    Usuario.findById(id,(err,usuario)=>{
        done(err,usuario);
    });
});