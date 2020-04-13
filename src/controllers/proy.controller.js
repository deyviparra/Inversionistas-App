const proyCtrl = {}
const Proyecto = require("../models/Proyecto");
const { unlink } = require("fs-extra");
const path = require("path");
const { uploadFile } = require('../upload.js')

var tipos = [];

proyCtrl.renderProyForm = (req, res) => {
  res.render('proyectos/nuevo-p')
  // const tipo = req.query

  // tipos.push(tipo)
  // console.log (tipos)

}
proyCtrl.createNewProy = async (req, res) => {
  const { nombre, tipo, direccion, rango, descripcion, municipio, departamento, estrato } = req.body;
  const newProyecto = new Proyecto({
    nombre,
    tipo,
    direccion,
    rango,
    descripcion,
    municipio,
    departamento,
    estrato
  });
  if (typeof req.file === 'undefined') {
    newProyecto.imagePath = "/uploads/sinfotop.png";
  } else {
    newProyecto.imagePath = "https://inversionistas-bucket.s3-sa-east-1.amazonaws.com/" + req.file.filename;
    await uploadFile(path.join(__dirname, '../public/uploads/' + req.file.filename), req.file.filename)

  }
  newProyecto.galeria = [""];
  newProyecto.tipos = [""];
  await newProyecto.save();
  req.flash('success_msg', 'Proyecto creado')
  res.redirect('/menuppal')
}
proyCtrl.renderProy = async (req, res) => {
  const proyectos = await Proyecto.find()
  res.render('proyectos/lista-p', { proyectos })
}
proyCtrl.renderEditFormProy = async (req, res) => {
  const proy = await Proyecto.findById(req.params.id)
  res.render('proyectos/edit-proy', { proy })
}
proyCtrl.updateProy = async (req, res) => {
  const { nombre, tipo, direccion, rango, descripcion, municipio, departamento, estrato } = req.body;
  if (typeof req.file === 'undefined') {
    await Proyecto.findByIdAndUpdate(req.params.id, { nombre, tipo, direccion, rango, descripcion, municipio, departamento, estrato })
  } else {
    const imagePath = "/uploads/" + req.file.filename;
    const proy = await Proyecto.findById(req.params.id)
    unlink(path.resolve(path.join(__dirname, '../public' + proy.imagePath)))
    await Proyecto.findByIdAndUpdate(req.params.id, { nombre, tipo, direccion, rango, municipio, departamento, estrato, imagePath })
  }
  req.flash('success_msg', 'Proyecto actualizado')
  res.redirect('/proy')
}
proyCtrl.deleteProy = async (req, res) => {
  const proy = await Proyecto.findById(req.params.id)
  await Proyecto.findByIdAndDelete(req.params.id)
  if (proy.imagePath !== '/uploads/sinfotop.png') {
    unlink(path.resolve(path.join(__dirname, '../public' + proy.imagePath)))
  }
  req.flash('error_msg', 'Proyecto eliminado')
  res.redirect('/proy')
}
proyCtrl.renderFichaP = async (req, res) => {
  const proyecto = await Proyecto.findById(req.params.id)
  res.render('proyectos/ficha-p', { proyecto })
}

proyCtrl.renderTipo = async (req, res) => {
  const proyecto = await Proyecto.findById(req.query.id)
  res.render('proyectos/tipos', { proyecto })

}
proyCtrl.updateType = async (req, res) => {
  const { tipos } = await Proyecto.findById(req.params.id)
  const tipo = req.body
  tipos.push(tipo)
  await Proyecto.findByIdAndUpdate(req.params.id, { tipos })
  req.flash('success_msg', 'Tipo añadido')
  res.redirect('/ficha-p/' + req.params.id)
}
module.exports = proyCtrl;