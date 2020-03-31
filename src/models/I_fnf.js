const { Schema, model } = require('mongoose')

const i_fnfSchema = new Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    
  }, {
    timestamps: true
  })
  
  module.exports = model('I_fnf', i_fnfSchema)