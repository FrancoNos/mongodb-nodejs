const express = require('express');
const path = require("path");
const exphbs = require("express-handlebars");
const morgan  = require ("morgan");
const methodOverride = require("method-override");
const indexRoutes = require('./routes/index.routes'); 
const notesRoutes = require('./routes/notes.routes'); 
const usersRoutes = require('./routes/users.routes'); 
const flash = require ("connect-flash");
const session = require("express-session");
const passport = require("passport");
require("../src/config/passport");

// Inicializaciones
const app = express();

// Configuraciones
app.set("port", process.env.PORT || 4000);
app.set("views", path.join(__dirname, "views"));

const hbs = exphbs.create({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
});

app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(methodOverride("_method"));
app.use(session({
    secret:"secret",
    resave:true,
    saveUninitialized:true,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Global variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
    res.locals.user = req.user || null;

    next();
})

// Rutas
app.use(indexRoutes); 
app.use(notesRoutes); 
app.use(usersRoutes); 

// Archivos estáticos
app.use(express.static(path.join(__dirname, "public")));

module.exports = app;
