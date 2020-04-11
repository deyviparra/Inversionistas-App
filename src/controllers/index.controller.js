const indexCtrl = {};
const Proyecto = require("../models/Proyecto");
const Noticia = require("../models/Noticia");
const {uploadFile}=require('../upload.js')
const mongoose = require("mongoose");
const path = require("path");



indexCtrl.renderIndex = async (req, res) => {
  const noticiaArray = await Noticia.find();
  const noticia = noticiaArray[0]
  console.log(noticiaArray)
  res.render("index", { noticia});
};
indexCtrl.renderNoticiaEdit = async (req, res) => {
  const noticiaArray = await Noticia.find();
  const noticia = noticiaArray[0];
  res.render("landing/edit-index", { noticia });
};
indexCtrl.updateNoticia = async (req, res) => {
  const { titulo, texto, img1, img2, img3 } = req.body;
  await Noticia.findByIdAndUpdate(req.params.id, {
    titulo,
    texto,
    img1,
    img2,
    img3
  });
  req.flash("success_msg", "Noticia actualizada");
  res.redirect("/");
};
indexCtrl.renderCreateNoticia= async (req,res)=>{
    res.render('landing/nueva-noticia')
}
indexCtrl.createNoticia = async (req, res) => {
  const { titulo, texto } = req.body;
  const newNoticia = new Noticia({
    titulo,
    texto,
  });
  newNoticia.img1="https://inversionistas-bucket.s3-sa-east-1.amazonaws.com/" + req.file.filename;
  await uploadFile(path.join(__dirname, '../public/uploads/' + req.file.filename),req.file.filename)
  await newNoticia.save();
  req.flash("success_msg", "Noticia creada");
  res.redirect("/");
};

indexCtrl.renderMenuppal = (req, res) => {
  res.render("menuppal");
};
module.exports = indexCtrl;
