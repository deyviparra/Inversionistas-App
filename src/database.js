const mongoose = require('mongoose')

const {MONGODB_URI}= process.env;

mongoose.connect(MONGODB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true,
    useFindAndModify:false
})
.then(db => console.log("Db is connect"))
  .catch(err => console.error(err));