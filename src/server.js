const express = require('express');
const path = require("path");
const exphbs = require("express-handlebars");
const indexRoutes = require('./routes/index.routes'); 

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

// Rutas
app.use(indexRoutes); 

// Archivos estáticos
app.use(express.static(path.join(__dirname, "public")));

module.exports = app;
