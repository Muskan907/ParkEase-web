const express = require('express');
const router = express.Router();

router.get('/login-options', (req, res) => {
    res.render('loginOptions', { title: 'Login Options' });
});

module.exports = router;
