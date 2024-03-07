const usersCtrl = {};

const passport = require ("passport");

const User = require('../models/User');


usersCtrl.renderSignUpForm = (req, res) => {
    res.render("users/signup");
}

usersCtrl.signUp = async (req, res) => {
    const errors = [];

    const { name, email, password, confirm_password } = req.body;

    if (password !== confirm_password) {
        errors.push({ text: "Las contraseñas no coinciden." });
    }

    if (password.length < 6) {
        errors.push({ text: "Las contraseñas deben tener al menos 6 caracteres." });
    }

    if (errors.length > 0) {
        return res.render("users/signup", {
            errors,
            name,
            email,
        });
    } else {
        try {
            const emailUser = await User.findOne({ email }); 
            if (emailUser) {
                req.flash("error_msg", "El email ya está en uso");
                res.redirect("/users/signup"); 
            } else {
                const newUser = new User({ name, email, password });
                newUser.password = await newUser.encryptPassword(password);
                await newUser.save();
                req.flash("success_msg", "El usuario se ha registrado correctamente.");
                res.redirect("/users/signin"); 
            }
        } catch (error) {
            console.error(error);
            res.status(500).send("Error interno del servidor");
        }
    }
}


usersCtrl.renderSignInForm = (req, res) => {
    res.render("users/signin");
}

usersCtrl.signIn = (req, res, next) => {
    console.log("Entrando en el controlador signIn");
    passport.authenticate("local", {
        failureRedirect: "/users/signin",
        successRedirect: "/notes/",
        failureFlash: true
    })(req, res, next);
};

usersCtrl.logOut = (req, res) => {
    req.logout((err) => {
        if (err) {
            console.error(err);
            req.flash("error_msg", "Error al cerrar sesión");
            res.redirect("/");  // O redirige a donde sea necesario en caso de error
        } else {
            req.flash("success_msg", "Sesión cerrada correctamente");
            res.redirect("/users/signin");
        }
    });
};



module.exports = usersCtrl;
