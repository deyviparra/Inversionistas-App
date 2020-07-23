const proyCtrl = {}
const Proyecto = require("../models/Proyecto");
const { unlink } = require("fs-extra");
const path = require("path");
const { uploadFile } = require('../upload.js')

proyCtrl.renderProyForm = (req, res) => {
  try {
    const backUrl = '/menuppal'
    res.render('proyectos/nuevo-p', { backUrl })
  }
  catch (e) {
    req.flash('error_msg', 'No se puede crear un proyecto')
    res.redirect('/menuppal');
    console.log(e);
  }
}
proyCtrl.createNewProy = async (req, res) => {
  try {
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
  catch (e) {
    req.flash('error_msg', 'No se pudo crear un proyecto')
    res.redirect('/menuppal');
    console.log(e);
  }
}
proyCtrl.renderProy = async (req, res) => {
  try {
    const backUrl = '/menuppal'
    const proyectos = await Proyecto.find()
    res.render('proyectos/lista-p', { proyectos, backUrl })
  }
  catch (e) {
    req.flash('error_msg', 'No se pueden visualizar los proyectos')
    res.redirect('/menuppal')
    console.log(e);
  }
}
proyCtrl.renderEditFormProy = async (req, res) => {
  try {
    const proy = await Proyecto.findById(req.params.id)
    const backUrl = '/ficha-p/' + proy._id
    res.render('proyectos/edit-proy', { proy, backUrl })
  }
  catch (e) {
    const proyecto = await Proyecto.findById(req.params.id)
    req.flash('error_msg', 'No se puede actualizar el proyecto')
    res.redirect('/ficha-p/' + proyecto._id)
    console.log(e);
  }
}
proyCtrl.updateProy = async (req, res) => {
  try {
    const proyecto = await Proyecto.findById(req.params.id)
    const { nombre, tipo, direccion, rango, descripcion, municipio, departamento, estrato } = req.body;
    if (typeof req.file === 'undefined') {
      await Proyecto.findByIdAndUpdate(req.params.id, { nombre, tipo, direccion, rango, descripcion, municipio, departamento, estrato })
    } else {
      const imagePath = "https://inversionistas-bucket.s3-sa-east-1.amazonaws.com/" + req.file.filename;
      await uploadFile(path.join(__dirname, '../public/uploads/' + req.file.filename), req.file.filename)
      const proy = await Proyecto.findById(req.params.id)
      if (proy.imagePath !== '/uploads/sinfotop.png') {
        unlink(path.resolve(path.join(__dirname, '../public' + proy.imagePath)))
      }
      await Proyecto.findByIdAndUpdate(req.params.id, { nombre, tipo, direccion, rango, municipio, departamento, estrato, imagePath })
    }
    req.flash('success_msg', 'Proyecto actualizado')
    res.redirect('/ficha-p/' + proyecto._id)
  }
  catch (e) {
    const proyecto = await Proyecto.findById(req.params.id)
    req.flash('error_msg', 'No se pudo actualizar el proyecto')
    res.redirect('/ficha-p/' + proyecto._id)
    console.log(e);
  }
}

proyCtrl.deleteProy = async (req, res) => {
  try {
    const proy = await Proyecto.findById(req.params.id)
    await Proyecto.findByIdAndDelete(req.params.id)
    if (proy.imagePath !== '/uploads/sinfotop.png') {
      unlink(path.resolve(path.join(__dirname, '../public' + proy.imagePath)))
    }
    req.flash('error_msg', 'Proyecto eliminado')
    res.redirect('/proy')
  }
  catch (e) {
    req.flash('error_msg', 'No se pudo eliminar el proyecto')
    res.redirect('/proy');
    console.log(e);
  }
}
proyCtrl.renderFichaP = async (req, res) => {
  try {
    const proyecto = await Proyecto.findById(req.params.id)
    const backUrl = '/proy'
    res.render('proyectos/ficha-p', { proyecto, backUrl })
  }
  catch (e) {
    req.flash('error_msg', 'No se puede visualizar el proyecto')
    res.redirect('/proy');
    console.log(e);
  }
}

proyCtrl.renderTipo = async (req, res) => {
  try {
    const proyecto = await Proyecto.findById(req.query.id)
    const backUrl = '/ficha-p/' + proyecto._id
    res.render('proyectos/tipos', { proyecto, backUrl })
  }
  catch (e) {
    const proyecto = await Proyecto.findById(req.query.id)
    req.flash('error_msg', 'No se puede añadir el tipo de apartamento')
    res.redirect('/ficha-p/' + proyecto._id)
    console.log(e);
  }
}
proyCtrl.updateType = async (req, res) => {
  try {
    const { tipos } = await Proyecto.findById(req.params.id)
    const tipo = req.body
    tipos.push(tipo)
    await Proyecto.findByIdAndUpdate(req.params.id, { tipos })
    req.flash('success_msg', 'Tipo añadido')
    res.redirect('/ficha-p/' + req.params.id)
  }
  catch (e) {
    req.flash('error_msg', 'No se pudo añadir el tipo de apartamento')
    res.redirect('/ficha-p/' + req.params.id)
    console.log(e);
  }
}
proyCtrl.deleteType = async (req, res) => {
  try {
    let { tipos, _id } = await Proyecto.findById(req.params.id);
    const arr1 = tipos.slice(0, req.params.index);
    const arr2 = tipos.slice(Number(req.params.index) + 1, tipos.length + 1);
    tipos = arr1.concat(arr2);
    await Proyecto.findByIdAndUpdate(req.params.id, {
      tipos
    });
    req.flash("success_msg", "Tipo de apartamento eliminado");
    res.send(["/ficha-p/" + _id])
  } catch (e) {

    console.log(e);
  }
}
module.exports = proyCtrl;