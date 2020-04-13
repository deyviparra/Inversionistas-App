const helpers = {};
const Handlebars = require("handlebars")

helpers.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        req.flash('error_msg', 'Debes iniciar sesión')
        res.redirect('../usuarios/login')
    }
}

// Handlebars.registerHelper("phoneNumber", function (num) {
//     num = num.toString();

//     return '(' + num.substr(0, 3) + ') '
//         + num.substr(3, 3) + '-'
//         + num.substr(6, 4);
// });

// Handlebars.registerHelper("addPoints", function (num) {
//     return num.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.');
// });

module.exports = helpers, Handlebars;