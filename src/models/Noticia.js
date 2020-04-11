const { Schema, model } = require('mongoose')

const noticiaSchema = new Schema({
  bannerPpal: { type: String },
  titulo: { type: String },
  texto: { type: String },
  img1: { type: String },
  img2: { type: String },
  img3: { type: String }
})

module.exports = model('Noticia', noticiaSchema)