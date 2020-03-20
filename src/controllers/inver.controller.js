const inverCtrl = {}
const Inversionista = require("../models/Inversionista");


inverCtrl.renderInverForm =(req,res)=>{
    res.render('inversionistas/nuevo-i')
}

inverCtrl.createNewInver = async (req,res)=>{
    const { nombre, apellido, telefono, correo, cedula,direccion,nacimiento, estado_civil, n_hijos, n_mascotas, hobby } = req.body;
    const newInversionista = new Inversionista({
        nombre,
        apellido,
        telefono,
        correo,
        cedula,
        direccion,
        nacimiento,
        estado_civil,
        n_hijos,
        n_mascotas,
        hobby
      });
      
      if (typeof req.file === 'undefined') {
        newInversionista.imagePath = "/uploads/sinfoto.png";
      } else {
        newInversionista.imagePath  = "/uploads/" + req.file.filename;
      }
      
      await newInversionista.save();
    res.render('menuppal')
}
inverCtrl.renderInver=async (req,res)=>{
    const inversionistas= await Inversionista.find()
    res.render('inversionistas/lista-i', {inversionistas})
}
inverCtrl.renderEditFormInver=(req,res)=>{
    res.send('inver form edit')
}
inverCtrl.updateInver=(req,res)=>{
    res.send('inver form update')
}
inverCtrl.deleteInver=async (req,res)=>{

    await Inversionista.findByIdAndDelete(req.params.id)
    res.redirect('/inver')
    
}
inverCtrl.renderFichaI = (req,res)=>{
    res.render('inversionistas/ficha-i')
}  



module.exports = inverCtrl;