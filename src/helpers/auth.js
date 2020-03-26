const helpers = {};

helpers.isAuthenticated =(req,res,next)=>{
    if(req.isAuthenticated()){
        return next();
    } else {
        req.flash('error_msg','Debes iniciar sesión')
        res.redirect('../usuarios/login')  
    }
}

module.exports =helpers;