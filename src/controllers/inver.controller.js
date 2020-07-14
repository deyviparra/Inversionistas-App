const inverCtrl = {}
const path = require("path");
const { unlink } = require("fs-extra");
const { uploadFile } = require('../upload.js')
const mongoose = require("mongoose");
const Inversionista = require("../models/Inversionista");
const Asociativo = require("../models/I_asociativo");
const Proyecto = require("../models/Proyecto");
const Icompra = require("../models/I_compra");
const Ifnf = require("../models/I_fnf");
const Igarantia = require("../models/I_garantia");
const InverUser = require('../models/Inver_User');



inverCtrl.renderInverForm = (req, res) => {
    try {
        const backUrl = '/menuppal'
        res.render('inversionistas/nuevo-i',{backUrl})
    }
    catch (e) {
        req.flash('error_msg', 'No se puede crear el inversionista')
        res.redirect("/menuppal");
        console.log(e);
    }
}

inverCtrl.createNewInver = async (req, res) => {
    try {
        const { razon_social, nit, nombre, apellido, celular, telefono, correo, cedula, direccion, nacimiento, estado_civil, n_hijos, n_mascotas, hobby, profesion, empresa } = req.body;
        const newInversionista = new Inversionista({
            razon_social,
            nit,
            nombre,
            apellido,
            telefono,
            celular,
            correo,
            cedula,
            direccion,
            nacimiento,
            estado_civil,
            n_hijos,
            n_mascotas,
            hobby,
            profesion,
            empresa
        });
        if (typeof req.file === 'undefined') {
            newInversionista.imagePath = "/uploads/sinfoto.png";
        } else {
            newInversionista.imagePath = "https://inversionistas-bucket.s3-sa-east-1.amazonaws.com/" + req.file.filename;

            await uploadFile(path.join(__dirname, '../public/uploads/' + req.file.filename), req.file.filename)

        }
        newInversionista.edad = calcularedad(nacimiento);

        await newInversionista.save();
        req.flash('success_msg', 'Inversionista creado')
        res.redirect('/menuppal')
    }
    catch (e) {
        req.flash('error_msg', 'No se pudo crear el inversionista')
        res.redirect("/menuppal");
        console.log(e);
    }
}

inverCtrl.renderInver = async (req, res) => {
    try {
        const backUrl = '/menuppal'
        const inversionistas = await Inversionista.find()
        res.render('inversionistas/lista-i', { inversionistas,backUrl })
    }
    catch (e) {
        req.flash('error_msg', 'No se puede visualizar los inversionistas')
        res.redirect("/menuppal");
        console.log(e);
    }
}

inverCtrl.renderEditFormInver = async (req, res) => {
    try {
        const inver = await Inversionista.findById(req.params.id)
        const backUrl = "/ficha-i/" + inver._id
        res.render('inversionistas/edit-inver', { inver,backUrl })
    }
    catch (e) {
        const inversionista = await Inversionista.findById(req.params.id)
        req.flash('error_msg', 'No se puede modificar el inversionista')
        res.redirect("/ficha-i/" + inversionista._id);
        console.log(e);
    }
}

inverCtrl.updateInver = async (req, res) => {
    try {
        const inversionista = await Inversionista.findById(req.params.id)
        const { razon_social, nit, nombre, apellido, telefono, celular, correo, cedula, direccion, nacimiento, estado_civil, n_hijos, n_mascotas, hobby, profesion, empresa } = req.body;
        const edad = calcularedad(nacimiento);
        if (typeof req.file === 'undefined') {
            await Inversionista.findByIdAndUpdate(req.params.id, { razon_social, nit, nombre, apellido, edad, telefono, celular, correo, cedula, direccion, nacimiento, estado_civil, n_hijos, n_mascotas, hobby, profesion, empresa })
        } else {
            const imagePath = "/uploads/" + req.file.filename;
            const inver = await Inversionista.findById(req.params.id)
            if (inver.imagePath !== '/uploads/sinfoto.png') {
                unlink(path.resolve(path.join(__dirname, '../public' + inver.imagePath)))
            }
            await Inversionista.findByIdAndUpdate(req.params.id, { razon_social, nit, nombre, apellido, edad, telefono, celular, correo, cedula, direccion, nacimiento, estado_civil, n_hijos, n_mascotas, hobby, profesion, empresa, imagePath })
        }
        req.flash('success_msg', 'Inversionista actualizado')
        res.redirect('/ficha-i/' + inversionista._id)
    }
    catch (e) {
        const inversionista = await Inversionista.findById(req.params.id)
        req.flash('error_msg', 'No se pudo modificar el inversionista')
        res.redirect("/ficha-i/" + inversionista._id);
        console.log(e);
    }
}

inverCtrl.deleteInver = async (req, res) => {
    try {
        const inver = await Inversionista.findById(req.params.id)
        console.log(req)
        await Inversionista.findByIdAndDelete(req.params.id)
        if (inver.imagePath !== '/uploads/sinfoto.png') {
            unlink(path.resolve(path.join(__dirname, '../public' + inver.imagePath)))
        }
        req.flash('error_msg', 'Inversionista eliminado')
        res.redirect('/inver')
    }
    catch (e) {
        req.flash('error_msg', 'No se pudo eliminar el inversionista')
        res.redirect('/inver')
        console.log(e);
    }
}

inverCtrl.renderFichaI = async (req, res) => {
    try {
        const backUrl = '/inver'
        const inversionista = await Inversionista.findById(req.params.id)
        // Inversiones propias
        const icompra = await Icompra.find({ inver_id: req.params.id })
        const ifnf = await Ifnf.find({ inver_id: req.params.id })
        const igarantia = await Igarantia.find({ inver_id: req.params.id })
        const iasociativo = await Asociativo.find({ inver_id: req.params.id })
        // Inversiones de otros
        const icompra_c = await Icompra.find({ "co_inversionista.id": mongoose.Types.ObjectId(req.params.id) })
        const ifnf_c = await Ifnf.find({ "co_inversionista.id": mongoose.Types.ObjectId(req.params.id) })
        const igarantia_c = await Igarantia.find({ "co_inversionista.id": mongoose.Types.ObjectId(req.params.id) })
        const iasociativo_c = await Asociativo.find({ "co_inversionista.id": mongoose.Types.ObjectId(req.params.id) })
        // Iversionistas como Usuarios
        const inveruser = await InverUser.find({ inver_id: req.params.id });
        res.render('inversionistas/ficha-i', { inversionista, iasociativo, icompra, ifnf, igarantia, icompra_c, ifnf_c, igarantia_c, iasociativo_c, inveruser,backUrl })
    }
    catch (e) {
        const backUrl = '/menuppal'
        req.flash('error_msg', 'No se puede visualizar el inversionista')
        res.redirect('/inver') 
        console.log(e);
    } 
}

inverCtrl.renderModelo = async (req, res) => {
    try {
        const inversionista = await Inversionista.findById(req.query.id)
        const backUrl= "/ficha-i/" + inversionista._id
        const proyecto = await Proyecto.find()
        res.render('modelos-inversion/' + req.query.modelo, { proyecto, inversionista,backUrl })
    }
    catch (e) {
        const inversionista = await Inversionista.findById(req.query.id)
        req.flash('error_msg', 'No se puede añadir la inversión')
        res.redirect("/ficha-i/" + inversionista._id);
        console.log(e);
    }
}

inverCtrl.searchInver = async (req,res) =>{
    try{
        //Por ahora solo busca con el nombre
        const backUlr = '/menuppal'
        const {buscarI} = req.query
        const nombre = buscarI.split(" ")
        const apellido = buscarI.split(" ")
        const razonSocial = buscarI.split(" ")
        const inverMatchN = await Inversionista.find({nombre:{$regex: nombre[0] , $options: "i"}},function(err, docs) {
            return docs
            });
        const inverMatchLN = await Inversionista.find({apellido:{$regex: apellido[0] , $options: "i"}},function(err, docs) {
            return docs
            });
        const inverMatchRS = await Inversionista.find({razon_social:{$regex: razonSocial[0] , $options: "i"}},function(err, docs) {
            return docs
            });

        const inverMatch = inverMatchN.concat(inverMatchLN).concat(inverMatchRS)
         
        res.render('inversionistas/lista-i', { inverMatch,backUlr })   
     }
    catch (e){
        console.log('error: ' + e)
    }
}

function calcularedad(edad) {
    try{
    let edad_arr = edad.split("-");
    let edad_fecha = new Date(edad_arr[0], edad_arr[1] - 1, edad_arr[2]);
    let edad_Dif = Date.now() - edad_fecha.getTime();
    let edad_Final = new Date(edad_Dif);
    return Math.abs(edad_Final.getUTCFullYear() - 1970);
}
catch{
  console.log('No es posible calcular la edad')
}
}

module.exports = inverCtrl;