const indexCtrl = {}

indexCtrl.renderIndex = (req,res)=>{
    res.render('index')
}  

indexCtrl.renderMenuppal = (req,res)=>{
    res.render('menuppal')
}  
module.exports = indexCtrl;