const indexCtrl = {};
const Noticia = require("../models/Noticia");
const {uploadFile}=require('../upload.js')
const path = require("path");



indexCtrl.renderIndex = async (req, res) => {
  const noticiaArray = await Noticia.find();
  const noticia = noticiaArray[0]
  res.render("index", { noticia});
};

indexCtrl.renderNoticiaEdit = async (req, res) => {
  try{
    const noticiaArray = await Noticia.find();
    const noticia = noticiaArray[0];
    res.render("landing/edit-index", { noticia });
  }
  catch (e) {
    req.flash('error_msg', 'La noticia no puede ser modificada')
    res.redirect("/");
    console.log(e);
  }
};

indexCtrl.updateNoticia = async (req, res) => {
  try{
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
  }
  catch (e) {
    req.flash('error_msg', 'La noticia no pudo ser modificada')
    res.redirect("/");
    console.log(e);
  }
};

indexCtrl.renderCreateNoticia= async (req,res)=>{
  try{
    res.render('landing/nueva-noticia')
  }
  catch (e) {
    req.flash('error_msg', 'La noticia no puede ser creada')
    res.redirect("/");
    console.log(e);
  }
}
indexCtrl.createNoticia = async (req, res) => {
  try{
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
  }
  catch (e) {
    req.flash('error_msg', 'La noticia no pudo ser creada')
    res.redirect("/");
    console.log(e);
  }
};

indexCtrl.renderMenuppal = (req, res) => {
  res.render("menuppal");
};
module.exports = indexCtrl;
