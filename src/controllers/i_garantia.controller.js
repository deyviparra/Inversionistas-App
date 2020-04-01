const igarantiaCtrl = {}
const Inversionista = require("../models/Inversionista");
const Proyecto = require("../models/Proyecto");
const Igarantia = require("../models/i_garantia");

igarantiaCtrl.createIgarantia = async (req, res) => {

    const inver_id = req.params.id;
    const { proyecto, 
        fecha_inicio,
        fecha_cierre, 
        periodo_liq, 
        valor_inversion,
        tasa_int_men, 
        tasa_int_anual, 
        peridoo_int } = req.body;
    const newIgarantia = new Igarantia({
        inver_id, 
        proyecto, 
        fecha_inicio,
        fecha_cierre,  
        periodo_liq, 
        valor_inversion,
        tasa_int_men, 
        tasa_int_anual, 
        peridoo_int 
    })
    await newIgarantia.save();
    req.flash('success_msg', 'Inversión creada')
    res.redirect('/ficha-i/' + req.params.id)
}

module.exports = igarantiaCtrl;