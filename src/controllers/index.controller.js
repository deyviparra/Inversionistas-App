const indexCtrl = {}

indexCtrl.renderIndex = (req,res)=>{
    res.render('index')
}  
indexCtrl.renderLogin = (req,res)=>{
    res.render('login')
}  


indexCtrl.renderMenuppal = (req,res)=>{
    res.render('menuppal')
}  
indexCtrl.renderRegistro = (req,res)=>{
    res.render('registro')
}  

module.exports = indexCtrl;