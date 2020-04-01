const inverCtrl = {}
const Inversionista = require("../models/Inversionista");
const Asociativo = require("../models/I_asociativo");
const { unlink } = require("fs-extra");
const path = require("path");
const {uploadFile}=require('../upload.js')
const Proyecto = require("../models/Proyecto");
const Icompra = require("../models/I_compra");
const Ifnf = require("../models/I_fnf");
const Igarantia = require("../models/I_garantia");


inverCtrl.renderInverForm = (req, res) => {
    res.render('inversionistas/nuevo-i')
}

inverCtrl.createNewInver = async (req, res) => {
    const { nombre, apellido, telefono, correo, cedula, direccion, nacimiento, estado_civil, n_hijos, n_mascotas, hobby } = req.body;
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
        newInversionista.imagePath  = "https://inversionistas-bucket.s3-sa-east-1.amazonaws.com/" + req.file.filename;
            
         await uploadFile(path.join(__dirname, '../public/uploads/' + req.file.filename),req.file.filename)
    
      }
      newInversionista.edad = calcularedad(nacimiento);
    
    await newInversionista.save();
    req.flash('success_msg', 'Inversionista creado')
    res.redirect('/menuppal')
}
inverCtrl.renderInver = async (req, res) => {
    const inversionistas = await Inversionista.find()
    res.render('inversionistas/lista-i', { inversionistas })
}
inverCtrl.renderEditFormInver = async (req, res) => {
    const inver = await Inversionista.findById(req.params.id)
    res.render('inversionistas/edit-inver', { inver })
}
inverCtrl.updateInver = async (req, res) => {
    const { nombre, apellido, telefono, correo, cedula, direccion, nacimiento, estado_civil, n_hijos, n_mascotas, hobby } = req.body;
    if (typeof req.file === 'undefined') {
        await Inversionista.findByIdAndUpdate(req.params.id, { nombre, apellido, telefono, correo, cedula, direccion, nacimiento, estado_civil, n_hijos, n_mascotas, hobby })
    } else {
        const imagePath = "/uploads/" + req.file.filename;
        const inver = await Inversionista.findById(req.params.id)
        unlink(path.resolve(path.join(__dirname, '../public' + inver.imagePath)))
        await Inversionista.findByIdAndUpdate(req.params.id, { nombre, apellido, telefono, correo, cedula, direccion, nacimiento, estado_civil, n_hijos, n_mascotas, hobby, imagePath })
    }
    req.flash('success_msg', 'Inversionista actualizado')
    res.redirect('/inver')
}
inverCtrl.deleteInver = async (req, res) => {

    const inver = await Inversionista.findById(req.params.id)
    await Inversionista.findByIdAndDelete(req.params.id)
    unlink(path.resolve(path.join(__dirname, '../public' + inver.imagePath)))
    req.flash('error_msg', 'Inversionista eliminado')
    res.redirect('/inver')
}
inverCtrl.renderFichaI = async (req, res) => {
    const inversionista = await Inversionista.findById(req.params.id)
    const icompra = await Icompra.find({inver_id:req.params.id})
    const ifnf = await Ifnf.find({inver_id:req.params.id})
    const igarantia = await Igarantia.find({inver_id:req.params.id})
    const asociativo = await Asociativo.find({inver_id:req.params.id})
    res.render('inversionistas/ficha-i', { inversionista,asociativo,icompra,ifnf,igarantia })
}



inverCtrl.renderModelo = async (req, res) => {
    const proyecto = await Proyecto.find()
    const inversionista = await Inversionista.findById(req.query.id)
    res.render('modelos-inversion/' + req.query.modelo, { proyecto, inversionista })
}

function calcularedad(edad) {
    var edad_arr = edad.split("-");
    var edad_fecha = new Date(edad_arr[0], edad_arr[1] - 1, edad_arr[2]);
    var edad_Dif = Date.now() - edad_fecha.getTime();
    var edad_Final = new Date(edad_Dif);
    return Math.abs(edad_Final.getUTCFullYear() - 1970);
}

module.exports = inverCtrl;