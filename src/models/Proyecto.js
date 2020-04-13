const {Schema,model} =require('mongoose');

const projectSchema = new Schema ({
    nombre:{type: String},
    tipo:{type: String},
    direccion:{type: String},
    descripcion:{type: String},
    rango:{type: String},
    municipio:{type: String},
    departamento:{type: String},
    estrato:{type:String},
    imagePath:{type: String},
    tipos:{type: Array},
    galeria:{type: Array},
 },{ timestamps:true
})

module.exports = model('Proyecto', projectSchema)