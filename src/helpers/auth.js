const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error_msg", "Por favor inicie sesión para acceder a las funcionalidades.");
    res.redirect("/users/signin");
};

module.exports = helpers;
