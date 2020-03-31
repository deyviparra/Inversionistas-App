const {Schema,model} =require('mongoose');

const projectSchema = new Schema ({
    nombre:{type: String, required: true},
    tipo:{type: String, required: true},
    direccion:{type: String, required: true},
    rango:{type: String, required: true},
    municipio:{type: String, required: true},
    departamento:{type: String, required: true},
    estrato:{type:String, required:true},
    imagePath:{type: String},
 },{ timestamps:true
})

module.exports = model('Proyecto', projectSchema)