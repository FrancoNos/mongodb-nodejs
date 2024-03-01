const indexCtrl = {};


indexCtrl.renderIndex = (req, res) => {
    res.render("partials/index");
};

indexCtrl.renderAbout = (req, res) => {
    res.render("partials/about");
};

module.exports = indexCtrl;
