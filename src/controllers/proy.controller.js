const proyCtrl = {}
const Proyecto = require("../models/Proyecto");
const { unlink } = require("fs-extra");
const path = require("path");


proyCtrl.renderProyForm =(req,res)=>{
    res.render('proyectos/nuevo-p')
}
proyCtrl.createNewProy =async (req,res)=>{
  const { nombre, tipo, direccion, rango, municipio, departamento} = req.body;
  const newProyecto = new Proyecto({
    nombre,
    tipo,
    direccion,
    rango,
    municipio,
    departamento
  });
  if (typeof req.file === 'undefined') {
    newProyecto.imagePath = "/uploads/sinfotop.png";
  } else {
    newProyecto.imagePath  = "/uploads/" + req.file.filename;
  }
  await newProyecto.save();
    req.flash('success_msg', 'Proyecto creado')
    res.redirect('/menuppal')
}
proyCtrl.renderProy= async (req,res)=>{
    const proyectos= await Proyecto.find()
    res.render('proyectos/lista-p', {proyectos})
}
proyCtrl.renderEditFormProy= async (req,res)=>{ 
  const proy = await Proyecto.findById(req.params.id)
  res.render('proyectos/edit-proy',{proy})
}
proyCtrl.updateProy= async(req,res)=>{
  const {nombre,tipo,direccion,rango,municipio,departamento}=req.body;
  if (typeof req.file === 'undefined') {
      await Proyecto.findByIdAndUpdate(req.params.id, {nombre,tipo,direccion,rango,municipio,departamento} )
  }else{
      const imagePath  = "/uploads/" + req.file.filename;
      const proy = await Proyecto.findById(req.params.id)
      unlink(path.resolve(path.join(__dirname, '../public'+ proy.imagePath)))
      await Proyecto.findByIdAndUpdate(req.params.id, {nombre,tipo,direccion,rango,municipio,departamento,imagePath} )
  }
      req.flash('success_msg', 'Proyecto actualizado')
      res.redirect('/proy')
}
proyCtrl.deleteProy= async (req,res)=>{
    const proy = await Proyecto.findById(req.params.id)
    await Proyecto.findByIdAndDelete(req.params.id)
    unlink(path.resolve(path.join(__dirname, '../public'+ proy.imagePath)))
    req.flash('error_msg', 'Proyecto eliminado')
    res.redirect('/proy')
}
proyCtrl.renderFichaP = async (req,res)=>{
  const proyecto = await Proyecto.findById(req.params.id)
    res.render('proyectos/ficha-p',{proyecto})
}  

module.exports = proyCtrl;