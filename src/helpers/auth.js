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

Handlebars.registerHelper("phoneNumber", function (num) {
    if (num != null && num != NaN) {
        num = num.toString();
        if(num.length == 10){ //Cellphone
            return '(' + num.substr(0, 3) + ') '
            + num.substr(3, 3) + '-'
            + num.substr(6, 4);
        }
        if (num.length <10){ //Home
            return '(' + num.substr(0, 3) + ') '
        + num.substr(3, 2) + '-'
        + num.substr(5, 3);
        }
        if(num.length >10){ //International
            return  '+' + num.substr(0,1) + ' ' +'('+ num.substr(1, 3) + ') '
            + num.substr(4, 3) + '-'
            + num.substr(7, 4);
        }
    }
});

Handlebars.registerHelper("addPoints", function (num) {
    if (num != null && num != NaN) {
        return num.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.');
    }
});

Handlebars.registerHelper("addPointsNit", function (num) {
    if (num != null && num != NaN) {
        num = num.toString();
        return num.substr(0, 3) + '.'
        + num.substr(3, 3) + '.'
        + num.substr(6,3) + '-'
        + num.substr(9);
    }
});

module.exports = helpers, Handlebars;