const usersCtrl = {};

usersCtrl.renderSignUpForm = (req, res) => {
    res.render("users/signup");
}

usersCtrl.signUp = (req, res) => {
    res.send("signUp"); 
}

usersCtrl.renderSignInForm = (req, res) => {
    res.render("users/signin");
}

usersCtrl.signIn = (req, res) => {
    res.send("sign in");
}

usersCtrl.logOut = (req, res) => {
    res.send("log out");
}

module.exports = usersCtrl;

