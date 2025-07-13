module.exports.ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated && req.isAuthenticated()) {
        return next();
    }
    if (req.session.userId) {
        return next();
    }
    return res.redirect('/user/login');
};
