const proyCtrl = {}
const Proyecto = require("../models/Proyecto");


proyCtrl.renderProyForm =(req,res)=>{
    res.render('proyectos/nuevo-p')
}
proyCtrl.createNewProy =async (req,res)=>{
  const { nombre, tipo, direccion, rango, municipio, departamento} = req.body;
  //const imagePath = "/uploads/" + req.file.filename;
  const newProyecto = new Proyecto({
    nombre,
    tipo,
    direccion,
    rango,
    municipio,
    departamento
  //  imagePath 
  });
  await newProyecto.save();
    res.render('menuppal')
}
proyCtrl.renderProy= async (req,res)=>{
    const proyectos= await Proyecto.find()
    res.render('proyectos/lista-p', {proyectos})
}
proyCtrl.renderEditFormProy=(req,res)=>{
    res.send('proy form edit')
}
proyCtrl.updateProy=(req,res)=>{
    res.send('proy form update')
}
proyCtrl.deleteProy= async (req,res)=>{

    await Proyecto.findByIdAndDelete(req.params.id)
    res.redirect('/proy')
}
proyCtrl.renderFichaP = (req,res)=>{
    res.render('proyectos/ficha-p')
}  

module.exports = proyCtrl;