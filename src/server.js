const express = require('express')
const path = require("path");
const exphbs =require('express-handlebars')
const morgan =require('morgan')
const multer = require("multer");
const methodOverride = require('method-override')


//inicializations
const app = express()


//settings
app.set("port", process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs',exphbs({
    defaultLayout: 'main',
    layoutsDir:path.join(app.get('views') +'/layouts'),
    partialsDir: path.join(app.get('views') +'/partials'),
    extname: '.hbs'
}))
app.set('view engine', '.hbs')

//middlewares
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(methodOverride('_method'))
// const storage = multer.diskStorage({
//     destination: path.join(__dirname, "public/uploads"),
//     filename(req, file, cb) {
//       cb(null, new Date().getTime() + path.extname(file.originalname)); //Error y nombre de la imagen con la fecha y la extension
//     }
//   });
//   app.use(multer({ storage }).single("image"));

//global variables

//routes
app.use(require('./routes/index.routes'));
app.use(require('./routes/inver.routes'));
app.use(require('./routes/proy.routes'));



//static files
app.use(express.static(path.join(__dirname, "public")));


module.exports = app