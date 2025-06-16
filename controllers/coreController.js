exports.index_get = (req, res) => {
    res.render('index');
};

exports.dashboard_get = (req, res) => {
    res.render('dashboard', { user: req.user });
};