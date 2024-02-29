const express = require('express');
const path = require("path");

//Iniciallizations
const app = express();

//Settings
app.set("port", process.env.PORT || 4000);
app.set("views", path.join(__dirname, "views"));

//Middlewares
app.use(express.urlencoded({extended:false}));


//Global variables

//Routes
app.get("/", (req, rest) => {
    rest.send ("hello world!");
})

//Static files
app.use(express.static(path.join(__dirname, "public")));


module.exports = app;