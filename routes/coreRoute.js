const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', { title: 'Express' });
});
router.get("/dashboard", (req, res) => {
    res.render('dashboard', { title: 'Dashboard' });
});

module.exports = router;