const { Schema, model } = require('mongoose')

const i_fcp_fnfSchema = new Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    
  }, {
    timestamps: true
  })
  
  module.exports = model('I_fcp_fnf', i_fcp_fnfSchema)