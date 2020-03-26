const mongoose = require('mongoose')

const {INVERSIONISTAS_MONGODB_HOST,INVERSIONISTAS_MONGODB_DATABASE}= process.env;
const MONGODB_URI = `mongodb://${INVERSIONISTAS_MONGODB_HOST}/${INVERSIONISTAS_MONGODB_DATABASE}`

mongoose.connect(MONGODB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true
})
.then(db => console.log("Db is connect"))
  .catch(err => console.error(err));