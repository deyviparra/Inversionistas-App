const icompraCtrl = {}
const Inversionista = require("../models/Inversionista");
const Proyecto = require("../models/Proyecto");
const Icompra = require("../models/I_compra");

icompraCtrl.createInvestment = async (req, res) => {

    const inver_id = req.params.id;
    const { proyecto, fecha_inicio,
        fecha_cierre, n_encargo_fidu, valor_copra,
        fecha_entrega_prometida, tir_prometida } = req.body;
    const newIcompra = new Icompra({
        inver_id, proyecto, fecha_inicio,
        fecha_cierre, n_encargo_fidu, valor_copra,
        fecha_entrega_prometida, tir_prometida
    })
    await newIcompra.save();
    req.flash('success_msg', 'Inversión creada')
    res.redirect('/ficha-i/' + req.params.id)
}

module.exports = icompraCtrl;