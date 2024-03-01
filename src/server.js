const express = require('express');
const path = require("path");
const exphbs = require("express-handlebars");

// Inicializaciones
const app = express();

// settings
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

// Routes
app.get("/", (req, res) => {
    res.render("partials/index");
  });

// static files
app.use(express.static(path.join(__dirname, "public")));

module.exports = app;
